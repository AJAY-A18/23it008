var app = angular.module("attendanceApp", []);

app.factory("DateFactory", function() {
    var factory = {};

    factory.cancelStudent = function(scope) {
        scope.student = {};
        scope.editMode = false;
    };

    return factory;
});

app.controller("MainCtrl", function($scope, $http, DateFactory) {
    $scope.student = {};
    $scope.attendanceList = [];
    $scope.editMode = false;

    function loadData() {
        $http.get("http://localhost:5000/list").then((res) => {
            $scope.attendanceList = res.data;
        });
    }

    loadData();

    $scope.saveStudent = function() {
        if ($scope.editMode) {
            $http.put("http://localhost:5000/update/" + $scope.student._id, $scope.student).then(res => {
                alert(res.data);
                $scope.student = {};
                $scope.editMode = false;
                loadData();
            });
        } else {
            $http.post("http://localhost:5000/add", $scope.student).then(res => {
                alert(res.data);
                $scope.student = {};
                loadData();
            });
        }
    };

    $scope.editStudent = function(a) {
        $scope.student = angular.copy(a);
        $scope.student.date = new Date(a.date);
        $scope.editMode = true;
    };

    $scope.cancelEdit = function() {
        DateFactory.cancelStudent($scope);
    };

    $scope.deleteStudent = function(id) {
        if (confirm("Are you sure to delete?")) {
            $http.delete("http://localhost:5000/delete/" + id).then(() => {
                alert("🗑️ Record deleted!");
                loadData();
            });
        }
    };
});
