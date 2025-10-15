var app = angular.module("chatApp", []);

app.controller("ChatCtrl", function($scope, $http) {
    $scope.chat = {};
    $scope.chatList = [];

    // Load messages
    function loadData() {
        $http.get("http://localhost:5000/list").then(res => {
            $scope.chatList = res.data;
        });
    }

    loadData();

    // Send a message
    $scope.sendMessage = function() {
        $http.post("http://localhost:5000/add", $scope.chat).then(res => {
            alert(res.data);
            $scope.chat = {};
            loadData();
        });
    }

    // Delete a message
    $scope.deleteMessage = function(id) {
        if(confirm("Delete this message?")) {
            $http.delete("http://localhost:5000/delete/" + id).then(() => {
                alert("Message deleted!");
                loadData();
            });
        }
    }
});
