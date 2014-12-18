/**
 * Created by chaow on 12/17/2014 AD.
 */

var app = angular.module("FacultyApp", ['ui.router']);

app.factory('FacultyService', function ($http) {

    return {
        getAll : function(){
            return $http.get('/admin/api/faculty');
        },

        getById : function($id){
            return $http.get('/admin/api/faculty/view/'+$id);
        },
        save: function ($faculty) {
            return $http({
                url: '/admin/api/faculty/save',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($faculty)
            });
        }


    }
});


app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    //
    // Now set up the states
    $stateProvider
        .state('list', {
            url: "/list",
            templateUrl: "/partial/admin/faculty/list.html",
            controller: 'FacultyListController',
            resolve : {
                facultyList : function(FacultyService){
                    return FacultyService.getAll();
                }
            }
        })
        .state('add',{
            url : '/add',
            templateUrl: '/partial/admin/faculty/form.html',
            controller: 'FacultyFormController',
            resolve : {
                faculty : function(){
                    return {
                        data : {
                            data : {}
                        }
                    };
                }
            }
        })
        .state('edit', {
            url: '/edit/:id',
            templateUrl: '/partial/admin/faculty/form.html',
            controller: 'FacultyFormController',
            resolve : {
                faculty : function(FacultyService,$stateParams){
                    return FacultyService.getById($stateParams.id)
                }
            }

        });

    $urlRouterProvider.otherwise("/list");

});


app.controller('FacultyListController', function ($scope,$state, facultyList) {

    console.log("FacultyListController");

    $scope.faculties = facultyList.data.data;


});

app.controller('FacultyFormController', function ($scope,$state, faculty,FacultyService) {
    $scope.faculty= faculty.data.data;
    $scope.state = $state;

    $scope.save = function(){
        FacultyService.save($scope.faculty).success(function(response){

        })
    }

});