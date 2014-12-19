/**
 * Created by chaow on 12/19/2014 AD.
 */


app.controller('AlertController',function($scope,$rootScope,$timeout){
    $scope.alerts = [];

    $rootScope.$on("AlertSuccess",function(response,args){

        var data = args.data;

        if ( data.message ){
            var alert = {
                type : "success",
                msg : args.data.message
            }
            $scope.alerts.push(alert);

            $timeout(function(){
                $scope.alerts.splice(0,1);
            },3000);

        }

    })

});