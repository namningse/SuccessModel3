/**
 * Created by chaow on 12/19/2014 AD.
 */


app.controller('AlertController',function($scope,$rootScope,$timeout){
    $scope.alerts = [];

    $scope.pushAlert = function(alert){
        $scope.alerts.push(alert);

        $timeout(function(){
            $scope.alerts.splice(0,1);
        },3000);
    }

    $rootScope.$on("AlertSuccess",function(response,args){

        var data = args.data;

        if ( data.message ){
            var alert = {
                type : "success",
                msg : args.data.message
            }
            $scope.pushAlert(alert);
        }
    });

    $rootScope.$on("AlertError",function(response,args){

        var alert = {
            type : "danger",
            msg : "There is something wrong, please contact administrator."
        }

        $scope.pushAlert(alert);
    })

});