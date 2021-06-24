angular.module("taskList").factory("tasksAPI", function ($http, config) {
  var _getTasks = function () {
    return $http.get(config.baseUrl + "/api/v1/tasks");
  };

  var _postTasks = function (task) {
    return $http.post(config.baseUrl + "/api/v1/tasks", task);
  };

  return {
    getTasks: _getTasks,
    postTasks: _postTasks,
  };
});
