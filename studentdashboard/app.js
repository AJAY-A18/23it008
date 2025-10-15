var app = angular.module("studentApp", []);

app.controller("StudentCtrl", function($scope, $http) {
  $scope.students = [];
  $scope.student = {};

  // Calculate total and grade
  function calculateGrade(stu) {
    stu.total = stu.m1 + stu.m2 + stu.m3;

    if (stu.total >= 240) stu.grade = "A";
    else if (stu.total >= 180) stu.grade = "B";
    else if (stu.total >= 120) stu.grade = "C";
    else stu.grade = "F";
  }

  // Add student and store in DB
  $scope.addStudent = function() {
    if (!$scope.student.name || !$scope.student.m1 || !$scope.student.m2 || !$scope.student.m3) {
      alert("Please enter all details!");
      return;
    }

    calculateGrade($scope.student);

    // Send to DB
    $http.post("http://localhost:5000/add", $scope.student)
      .then(() => {
        alert("Student added!");
        $scope.loadStudents();
        $scope.student = {};
      });
  };

  // Load all students
  $scope.loadStudents = function() {
    $http.get("http://localhost:5000/list")
      .then(res => {
        $scope.students = res.data;
      });
  };

  $scope.loadStudents();
});
