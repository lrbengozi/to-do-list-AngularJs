angular.module("taskList").factory("tasksAPI", function ($http, config) {
  var _getPendingTasks = function () {
    return $http.get(config.baseUrl + "/api/v1/tasks?pending=true");
  };

  var _getClosedTasks = function () {
    return $http.get(config.baseUrl + "/api/v1/tasks?pending=false");
  };

  var _postTasks = function (task) {
    return $http.post(config.baseUrl + "/api/v1/tasks", task);
  };

  var _postRandomTasks = function () {
    return $http.post(config.baseUrl + "/api/v1/tasks/random", {
      name: "Eu",
      email: "eu@me.com",
    });
  };

  var _closeTasks = function (id) {
    return $http.post(config.baseUrl + `/api/v1/tasks/finish/${id}`);
  };

  var _reopenTasks = function (id, password) {
    $http.defaults.headers.common.Auth = password;
    return $http.post(config.baseUrl + `/api/v1/tasks/reopen/${id}`);
  };

  return {
    getPendingTasks: _getPendingTasks,
    getClosedTasks: _getClosedTasks,
    postTasks: _postTasks,
    postRandomTasks: _postRandomTasks,
    closeTasks: _closeTasks,
    reopenTasks: _reopenTasks,
  };
});
