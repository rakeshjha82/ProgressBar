(function () {
'use strict';

    angular.module('app')
        .factory('mainService', mainService);

    function mainService ($q, $http){
        return {
            getEndPoints: function (){
                var url = "http://pb-api.herokuapp.com/bars";
                var deferred = $q.defer();
                
                $http.get(url)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (){
                        deferred.reject('Error fetching data ');
                    });

                return deferred.promise;
            }
        }
    }

})();