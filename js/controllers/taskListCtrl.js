angular
  .module("taskList")
  .controller("taskListCtrl", function ($scope, tasksAPI) {
    $scope.app = "To-Do";
    $scope.openTasks = [];
    $scope.closedTasks = [];

    $scope.selectId = function (task) {
      $scope.selectedId = task.id;
    };

    var listPendingTask = function () {
      tasksAPI
        .getPendingTasks()
        .success(function (data) {
          $scope.openTasks = data;
        })
        .error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data.error;
        });
    };

    var listClosedTask = function () {
      tasksAPI
        .getClosedTasks()
        .success(function (data) {
          $scope.closedTasks = data;
        })
        .error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data.error;
        });
    };

    $scope.addTask = function (task) {
      tasksAPI
        .postTasks(task)
        .success(function (data) {
          delete $scope.task;
          $scope.taskForm.$setPristine();
          listPendingTask();
        })
        .error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data.error;
        });
    };

    $scope.addRandomTask = function () {
      tasksAPI
        .postRandomTasks()
        .success(function (data) {
          listPendingTask();
        })
        .error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data.error;
        });
    };

    $scope.finishTask = function (task) {
      tasksAPI
        .closeTasks(task.id)
        .success(function (data) {
          listClosedTask();
          listPendingTask();
        })
        .error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data.error;
        });
    };

    $scope.reopenTask = function () {
      tasksAPI
        .reopenTasks($scope.selectedId, $scope.password)
        .success(function (data) {
          listClosedTask();
          listPendingTask();
          $scope.password = "";
        })
        .error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data.error;
          $scope.password = "";
        });
    };

    $scope.filterBy = function (field) {
      $scope.orderField = field;
      $scope.orderBy = !$scope.orderBy;
    };

    listPendingTask();
    listClosedTask();
  });
