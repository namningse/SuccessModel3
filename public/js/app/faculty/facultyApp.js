/**
 * Created by chaow on 12/17/2014 AD.
 */

var app = angular.module("FacultyApp", ['ui.router']);

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

app.factory('FacultyService', function () {
    var $faculties = [
        {
            id: 0,
            name_en: "ICT"
        },
        {
            id: 1,
            name_en: "Nurse"
        }
    ];

    return {
        getAll : function(){
            return $faculties;
        },

        getById : function($id){
            return $faculties[$id];
        }

    }
});

app.controller('FacultyListController', function ($scope,$state, facultyList) {
    $scope.faculties = facultyList;
});

app.controller('FacultyFormController', function ($scope,$state, faculty) {
    $scope.faculty= faculty;
    $scope.state = $state;

});