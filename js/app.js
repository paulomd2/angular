'user strict';
(function () {
    angular.module('ControlMidia', [])

            .config('routeProvider', function ($routeProvider) {
                $routeProvider
                .when('/', {
                    templateUrl: 'login.html'
                })
                .when('/cliente', {
                    resolve: {
                        "check": function ($location, $rootScope) {
                            if (!$rootScope.loggedIn) {
                                $location.path('/');
                            }
                        }
                    },
                    templateUrl: '/cliente.html'
                })
                .otherwise({
                    redirectTo: '/'
                })
            })

            .controller('loginCtrl', function ($scope, $http, $location, $rootScope) {
                $scope.submit = function () {
                    var data = {
                        opcao: 'checaUsuario',
                        usuario: $scope.username,
                        senha: $scope.password,
                    };

                    $http.post('./control/usuariosControle.php', data).then(function (response) {
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
            });
})();