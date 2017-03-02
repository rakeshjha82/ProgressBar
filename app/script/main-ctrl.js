(function (){
'use strict';

    angular.module('app')
        .controller('mainCtrl', mainCtrl);
    mainCtrl.$inject = ['$scope', 'mainService'];

    function mainCtrl ($scope, mainService) {
        $scope.progressBar = {
            data: [],
            buttons: [],
            limit: 100
        };
        $scope.selectedProgressBar = 0;
        mainService.getEndPoints().then(function (response){
            $scope.progressBar.buttons = response.buttons;
            $scope.progressBar.limit = response.limit;
            angular.forEach(response.bars , function (value, index){
                $scope.progressBar.data.push({
                    "index": index,
                    "name": "#Progress" + (index+1),
                    "barValue": value,
                    "style": {
                        "width": parseInt((value*100)/$scope.progressBar.limit) + '%'
                    }
                });
            });

            $scope.selectedProgressBar =  $scope.progressBar.data[0];
        }, function (error) {
            console.log(error);
        });

        $scope.updateProgressBarStatus = function (val) {
            var tempProgressBarVal =  $scope.progressBar.data[$scope.selectedProgressBar.index]['barValue'];
                tempProgressBarVal += val;
             tempProgressBarVal = tempProgressBarVal < 0 ? 0 : (tempProgressBarVal > $scope.progressBar.limit ? $scope.progressBar.limit : tempProgressBarVal);
            
            $scope.progressBar.data[$scope.selectedProgressBar.index]['barValue'] = tempProgressBarVal;
            $scope.progressBar.data[$scope.selectedProgressBar.index]['style'] = {
                "width": tempProgressBarVal + '%'
            }
            //console.log( $scope.progressBar.data[$scope.selectedProgressBar.index]);
        }

    }
})();