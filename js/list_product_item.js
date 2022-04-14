var app = angular.module("myapp", ["firebase"]);
app.config(function () {
    var config = {
        apiKey: "AIzaSyCbt1tZdNC3hx2QWHtn8s3ernJf8CL1fvM",
        authDomain: "frontendasm-f42e6.firebaseapp.com",
        projectId: "frontendasm-f42e6",
        databaseURL: "https://frontendasm-f42e6-default-rtdb.firebaseio.com/",
        storageBucket: "frontendasm-f42e6.appspot.com",
        messagingSenderId: "419095912319",
        appId: "1:419095912319:web:d693351cb1d297b686844a"
    };
    firebase.initializeApp(config);
});

app.controller("MyCtrl", ["$scope", "$firebaseArray",
    ($scope, $firebaseArray) => {
        //Đầu tiên tạo biến lấy session có tên User
        let sessionLogin = sessionStorage.getItem("User");
        //Nếu session tồn tại thì gán $scope.Username = sessionLogin
        if (sessionLogin != null) {
            $scope.username = sessionLogin;
            $scope.login = true;
        } else {
            $scope.login = false;
        }
        //Xóa session trả vè trang index
        $scope.logout = () => {
            sessionStorage.clear();
            location.replace("./index.html");
        };


        var ref = firebase.database().ref("SanPham");
        var list = $firebaseArray(ref);
        list.$loaded().then(() => {
            //Gán $scope.listsanpham = list vừa lấy từ firebase để lên chạy vòng lặp
            $scope.listSanPham = list;
            //Mới vô hiển thị bao nhiêu sản phẩm
            $scope.limit = 15;
            //mặc định trang đầu tiên là trang 1
            $scope.numberPage = 1;
            //lấy độ dài của list sản phẩm chia cho số sản phẩm muốn hiển thị rồi làm tròn lên
            $scope.totalPage = Math.ceil($scope.listSanPham.length / $scope.limit);
        });
        $scope.setLimit=(x)=>{
            $scope.limit=x;
            $scope.numberPage = 1;
            $scope.totalPage = Math.ceil($scope.listSanPham.length / $scope.limit);
        }
        $scope.setNumberPage=(x)=>{
            $scope.numberPage=x;
        }
        $scope.previous = ()=> {
            if ($scope.numberPage > 1) {
                $scope.numberPage--;
            }
        }
        $scope.next = ()=> {
            if ($scope.numberPage < $scope.totalPage) {
                $scope.numberPage++;
            }
        }
        $scope.total = 0;
        $scope.gioHang = [];
        $scope.addCart = function (sp) {
            $scope.gioHang.push(sp);
            $scope.total++;
            console.log($scope.gioHang);
            localStorage.setItem("GioHang", JSON.stringify($scope.gioHang));
        }
    }

]);