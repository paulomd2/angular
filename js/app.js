'user strict';
(function () {
    angular.module('ControlMidia', ['ngRoute'])

            .config(function ($routeProvider) {
                $routeProvider
                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'loginCtrl'
                })
                .otherwise({redirectTo: '/login'})
            })

            .controller('loginCtrl', function ($scope, $location, Service) {
                $scope.user = {}
                $scope.signin = function (user) {
                    var data = {
                        opcao: 'checaUsuario',
                        usuario: user.username,
                        senha: user.password,
                    };

                    Service.login(data).then(function (response) {
                        var resposta = response.data;

                        if (resposta !== 0) {
                            $rootScope.nome = resposta.nome;
                            $rootScope.nivel = resposta.nivel;
                            $rootScope.cliente = resposta.cliente;
                            $rootScope.loggedIn = true;

                            $location.path(resposta.url);
                        } else {
                            alert('Usuário ou senha inválidos!');
                        }
                    });
                 };
           })

            .factory('Service', function($http){
                return {
                    login: function(user){
                        return $http.post('./control/usuariosControle.php', data);
                    };
                }
            }])
})();