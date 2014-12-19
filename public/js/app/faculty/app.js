/**
 * Created by chaow on 12/17/2014 AD.
 */

var app = angular.module("FacultyApp", ['ui.router','ngLoadingSpinner','ui.bootstrap']);



app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/list");


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


});
