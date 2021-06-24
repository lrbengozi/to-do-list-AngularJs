angular
  .module("taskList")
  .controller("taskListCtrl", function ($scope, tasksAPI) {
    $scope.app = "Task List";
    $scope.tasks = [];

    var listTask = function () {
      tasksAPI
        .getTasks()
        .success(function (data) {
          $scope.tasks = data;
        })
        .error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.addTask = function (task) {
      tasksAPI
        .postTasks(task)
        .success(function (data) {
          delete $scope.task;
          $scope.taskForm.$setPristine();
          listTask();
        })
        .error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });
    };

    $scope.filterBy = function (field) {
      $scope.orderField = field;
      $scope.orderBy = !$scope.orderBy;
    };

    listTask();
  });
