'use strict';

angular.module('drivesenseApp')
  .controller('NewLessonDialog', function ($scope, time, Auth, $lessons, $students, $mdDialog, $q) {
    $scope.students = [];
    time = time || new moment().startOf('hour');

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
    $scope.duration = 45;

    $scope.save = function () {
      $q.all(_.map($scope.students, function (student) {
          return $lessons.save({
            student: student._id,
            duration: $scope.duration,
            date: $scope.time
          }).$promise
        }))
        .then(function (results) {
          $mdDialog.hide(results);
        });
    }
  });