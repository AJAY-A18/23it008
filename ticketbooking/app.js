var app = angular.module("ticketApp", []);
app.directive("seatSelector", function() {
  return {
    restrict: "E",
    scope: { selectedSeats: "=" },
    template: `
      <div style="text-align:center">
        <h4>Select Seats:</h4>
        <div>
          <div ng-repeat="seat in seats"
               ng-click="toggleSeat(seat)"
               ng-class="{'seat': true, 'selected': isSelected(seat)}">
            {{seat}}
          </div>
        </div>
        <p><strong>Selected Seats:</strong> {{selectedSeats.join(', ') || 'None'}}</p>
      </div>
    `,
    link: function(scope) {
      scope.seats = ["A1", "A2", "A3", "A4", "A5",
                     "B1", "B2", "B3", "B4", "B5"];
      scope.selectedSeats = scope.selectedSeats || [];

      scope.toggleSeat = function(seat) {
        const idx = scope.selectedSeats.indexOf(seat);
        if (idx > -1) {
          scope.selectedSeats.splice(idx, 1);
        } else {
          if (scope.selectedSeats.length < 5) {
            scope.selectedSeats.push(seat);
          } else {
            alert("You can select up to 5 seats only!");
          }
        }
      };

      scope.isSelected = function(seat) {
        return scope.selectedSeats.includes(seat);
      };
    }
  };
});

app.controller("MainCtrl", function($scope, $http) {
  $scope.booking = {};
  $scope.bookingList = [];
  $scope.editMode = false;

  function loadData() {
    $http.get("http://localhost:5000/list").then((res) => {
      $scope.bookingList = res.data;
    });
  }
  loadData();

  $scope.saveBooking = function() {
    if (!$scope.booking.seats || $scope.booking.seats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }

    if ($scope.editMode) {
      $http.put("http://localhost:5000/update/" + $scope.booking._id, $scope.booking)
        .then(res => {
          alert(res.data);
          $scope.booking = {};
          $scope.editMode = false;
          loadData();
        });
    } else {
      $http.post("http://localhost:5000/add", $scope.booking)
        .then(res => {
          alert(res.data);
          $scope.booking = {};
          loadData();
        });
    }
  };

  $scope.editBooking = function(b) {
    $scope.booking = angular.copy(b);
    $scope.editMode = true;
  };

  $scope.cancelEdit = function() {
    $scope.booking = {};
    $scope.editMode = false;
  };

  $scope.deleteBooking = function(id) {
    if (confirm("Are you sure to delete this booking?")) {
      $http.delete("http://localhost:5000/delete/" + id)
        .then(() => {
          alert(" Booking deleted!");
          loadData();
        });
    }
  };
});
