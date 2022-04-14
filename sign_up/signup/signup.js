const app = angular.module("MyApp", ["firebase"]);
app.config(() => {
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
    "$firebaseArray",
    ($scope, $firebaseArray) => {
        //Checklogin
        let sessionLogin = sessionStorage.getItem("User");
        if (sessionLogin != null) {
            location.replace("../index.html");
            return;
        }
        const ref = firebase.database().ref("Students");
        const list = $firebaseArray(ref);

        list.$loaded().then(() => {
            console.log(list);
            $scope.register = () => {
                //Lấy giá trị từ ô input
                const username = $scope.idUser;
                const password = $scope.idPassword;
                const repassword = $scope.idRePassword;
                const fullname = $scope.idFullname;
                const email = $scope.idEmail;
                //Tạo 1 Object chứa khách hàng
                const registerObj = {
                    username: username,
                    password: password,
                    fullname: fullname,
                    email: email,
                };
                //Tạo biến check đăng ký
                var checkRegister = true;
                if ((!username, !password, !repassword, !fullname, !email)) {
                    checkRegister = false;
                }
                //Tìm username xem đã tồn tại hay chưa
                var idx = list.findIndex((item) => {
                    return username == item.TaiKhoan;
                });
                //Nếu user name đã tồn tại
                if (idx > -1) {
                    $scope.reason = "Tên đăng nhập đã tồn tại!";
                    checkRegister = false;
                } else if (password != repassword) {
                    $scope.reason = "Nhập lại mật khẩu sai!";
                    checkRegister = false;
                }else{
                    $scope.reason = null;
                }
                // Kiểm tra đăng ký thành công hoặc thất bại
                $scope.registerSucess = checkRegister;
                if (checkRegister) {
                    list.$add(registerObj).then((ref) => {
                        //Tạo id ngẫu nhiên
                        const id = ref.key;
                        list.$indexFor(id); // returns location in the array
                    });
                    alert("Đăng ký thành công");
                    location.replace("../log_in/login.html");
                }
            };
        });
    },
]);
