angular.module("app").factory("workersResumeListener",["$rootScope",function(a){"use strict";var b=new SocketListener(a,"resume");return b}]);