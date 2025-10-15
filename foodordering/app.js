var app = angular.module("foodApp", []);

app.controller("FoodCtrl", function($scope, $http) {
  $scope.filterType = "";
  $scope.foodItems = [
    { name: "Paneer Butter Masala", details: "Creamy cottage cheese curry", price: 180, isVeg: true, image: "2.png" },
    { name: "Chicken Biryani", details: "Aromatic rice with spicy chicken", price: 220, isVeg: false, image: "3.png" },
    { name: "Veg Burger", details: "Crispy patty with fresh veggies", price: 120, isVeg: true, image: "1.png" },
    { name: "Fish Curry", details: "Tangy and spicy coastal curry", price: 250, isVeg: false, image: "4.png" },
    { name: "Mushroom Pizza", details: "Cheesy pizza with mushrooms", price: 200, isVeg: true, image: "5.png" }
  ];

  $scope.foodFilter = function(food) {
    if ($scope.filterType === "") return true;
    return $scope.filterType === "veg" ? food.isVeg : !food.isVeg;
  };

  $scope.orders = [];
  $http.get("http://localhost:5000/orders").then(res => {
    $scope.orders = res.data;
  });

  $scope.orderFood = function(food) {
    const customerName = prompt("Enter your name:");
    if (!customerName) return;

    const order = { name: customerName, foodItem: food.name, price: food.price, isVeg: food.isVeg };
    $http.post("http://localhost:5000/order", order).then(res => {
      alert(" Order placed!");
      $scope.orders.push(order);
    });
  };
});
