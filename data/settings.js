//document.body.addEventListener('click', function () {
//  self.port.emit("sms", Date.now());
//});




options = {};

self.port.on('formats', function (s0) {
    options = s0;
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['love']);
    });
});


app = angular.module('love', []);
dir = document.getElementById('dir');
app.controller('lvctrl', function ($scope) {
    $scope.master = options;

    $scope.user = angular.copy($scope.master);
    dir.innerHTML = $scope.user.dir;



    $scope.adext = function (arr) {
        var a = window.prompt("Enter extension name:", "");
        if (a)
            $scope.user[arr].push(a);
    }

    $scope.sendSms = function () {
        self.port.emit('sms', $scope.user);
    }


    $scope.changeDir = function () {
        self.port.emit('dir', "dude");
    }


    self.port.on('nDir', function (sk) {
        $scope.user.dir = sk;
        dir.innerHTML = sk;

    });

});