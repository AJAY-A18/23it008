var app = angular.module("musicApp", []);

app.directive("songPlayer", function() {
  return {
    restrict: "A",
    scope: { url: "=" },
    template: `
      <div>
        <audio ng-src="{{url}}" id="audio_{{$id}}"></audio>
        <button ng-click="play()"> Play</button>
        <button ng-click="pause()"> Pause</button>
        <button ng-click="stop()">Stop</button>
      </div>
    `,
    link: function(scope, element, attrs) {
      const audio = element.find("audio")[0];

      scope.play = () => audio.play();
      scope.pause = () => audio.pause();
      scope.stop = () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  };
});

app.controller("MainCtrl", function($scope, $http) {
  $scope.song = {};
  $scope.songList = [];
  $scope.editMode = false;

  function loadData() {
    $http.get("http://localhost:5000/list").then((res) => {
      $scope.songList = res.data;
    });
  }
  loadData();

  $scope.saveSong = function() {
    if ($scope.editMode) {
      $http.put("http://localhost:5000/update/" + $scope.song._id, $scope.song)
        .then(res => {
          alert(res.data);
          $scope.song = {};
          $scope.editMode = false;
          loadData();
        });
    } else {
      $http.post("http://localhost:5000/add", $scope.song)
        .then(res => {
          alert(res.data);
          $scope.song = {};
          loadData();
        });
    }
  };

  $scope.editSong = function(s) {
    $scope.song = angular.copy(s);
    $scope.editMode = true;
  };

  $scope.cancelEdit = function() {
    $scope.song = {};
    $scope.editMode = false;
  };

  $scope.deleteSong = function(id) {
    if (confirm("Are you sure to delete this song?")) {
      $http.delete("http://localhost:5000/delete/" + id)
        .then(() => {
          alert(" Song deleted!");
          loadData();
        });
    }
  };
});
