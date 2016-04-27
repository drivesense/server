'use strict';

angular.module('drivesenseApp')
  .controller('newLessonDialog', function ($scope, time, Auth, $lessons, $students, $mdDialog) {
    $scope.students = [];
    time = time || new moment().startOf('hour');

    var teacher = Auth.getCurrentUser();

    $scope.loadStudents = function (query) {
      return $students.query().$promise
        .then(function (students) {
          return _.map(students, function (student) {
            student.fullname = student.name.first + ' ' + student.name.last;
            return student;
          })
        });
    };

    $scope.time = time.toDate();

    $scope.duration = 30;
    $scope.save = function () {
      $lessons.save({
        students: $scope.students,
        duration: $scope.duration,
        date: $scope.time
      }).$promise
        .then(function () {
          $mdDialog.hide()
        })
    }
  });