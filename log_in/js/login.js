var app = angular.module("myapp", ["firebase"]);
app.config(function () {
  var config = {
    apiKey: "AIzaSyCbt1tZdNC3hx2QWHtn8s3ernJf8CL1fvM",
    authDomain: "frontendasm-f42e6.firebaseapp.com",
    databaseURL: "https://frontendasm-f42e6-default-rtdb.firebaseio.com",
    projectId: "frontendasm-f42e6",
    storageBucket: "frontendasm-f42e6.appspot.com",
    messagingSenderId: "419095912319",
    appId: "1:419095912319:web:d693351cb1d297b686844a"
  };
  firebase.initializeApp(config);
});
app.controller("MyCtrl", [
  "$scope",
  "$firebaseObject",
  ($scope, $firebaseObject) => {
    //Checklogin
    let sessionLogin = sessionStorage.getItem("User");
    if (sessionLogin != null) {
      location.replace("../index.html");
      return;
    }
    const ref = firebase.database().ref("Students");
    const obj = $firebaseObject(ref);
    //mảng obj
    
    //Chạy đồng bộ
    //đợi obj load xong mới xử lý all bên trong
    obj.$loaded().then(() => {
      const SinhVienData = obj;
      console.log(SinhVienData);
      $scope.login = () => {
        const username = document.getElementById("idUser").value;
        const password = document.getElementById("idPassword").value;
        angular.forEach(SinhVienData, (item) => {
          console.log(item.username);
          if (username == item.username && password === item.password) {
            sessionStorage.setItem("User", username);
            console.log('OK')
            location.replace("../index.html");
            return;
          } else {
            $scope.loginFail = true;
            $scope.message = "Tên đăng nhập hoặc mật khẩu không chính xác";
          }
        });
      };
    });
  },
]);
