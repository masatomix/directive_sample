'use strict';

angular.module(APP_NAME)
    .controller('AboutCtrl', function ($scope) {

        $scope.init = function () {
            $scope.friends = [
                {name: 'John 25', age: 25, gender: 'boy', id: 5},
                {name: 'Jessie 30', age: 30, gender: 'girl', id: 4},
                {name: 'Johanna 28', age: 28, gender: 'girl', id: 3},
                {name: 'Joy 15', age: 15, gender: 'girl', id: 2},
                {name: 'Mary 28', age: 28, gender: 'girl', id: 6},
                {name: 'Peter 95', age: 95, gender: 'boy', id: 7},
                {name: 'Sebastian 50', age: 50, gender: 'boy', id: 1},
                {name: 'Erika 27', age: 27, gender: 'girl', id: 8},
                {name: 'Patrick 40', age: 40, gender: 'boy', id: 10},
                {name: 'Samantha 60', age: 60, gender: 'girl', id: 9}
            ];
        };


        $scope.click = function () {
            angular.forEach($scope.friends, function (value, key) {
                console.log(value);
            });
        };

        $scope.search = function () {
            $scope.friends = [
                {name: 'Peter 95', age: 95, gender: 'boy', id: 7},
                {name: 'Erika 27', age: 27, gender: 'girl', id: 8}
            ];

            angular.forEach($scope.friends, function (value, key) {
                console.log(value);
            });
        };

        $scope.index = function (hash,value,index) {
            console.log(hash);
            console.log(value);
            console.log(index);
            return index;
        }

        $scope.init();


    });


angular.module(APP_NAME)
    .directive('displayValue', function () {
        return {
            restrict: 'E',
            // templateからのアクセス。
            // controllerがもってる$scopeへは直接アクセス出来る
            template: '[ {{$ctrl.getName()}} ]/[ {{$ctrl.name}} ]', // controllerが持つデータへのアクセス
            scope: {},
            bindToController: {
                name: "="
            },
            controller: function () {
                this.getName = function () {
                    return this.name; // nameはthisでとれるようになる。テンプレートからは$ctrlで。
                };
                console.log('call!');
            },
            controllerAs: "$ctrl"
        };

    });