/**
 * Created by chaow on 12/19/2014 AD.
 */

app.factory('httpInterceptor', function ($q, $rootScope, $log) {

    var numLoadings = 0;

    return {
        request: function (config) {

            numLoadings++;

            return config || $q.when(config)

        },
        response: function (response) {

            if ((--numLoadings) === 0) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
                $rootScope.$broadcast("AlertSuccess",response);
            }

            return response || $q.when(response);

        },
        responseError: function (response) {

            if (!(--numLoadings)) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
                console.log(response);

            }

            return $q.reject(response);
        }
    };
});
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});