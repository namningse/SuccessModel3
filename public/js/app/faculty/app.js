/**
 * Created by chaow on 12/17/2014 AD.
 */

var app = angular.module("FacultyApp", ['ui.router','ngLoadingSpinner','ui.bootstrap','naif.base64']);



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

        })
        .state('cover',{
            url: '/cover/:id',
            templateUrl: '/partial/admin/faculty/cover.html',
            controller: 'FacultyCoverController',
            resolve : {
                faculty : function(FacultyService,$stateParams){
                    return FacultyService.getById($stateParams.id)
                },
                cover : function(FacultyService,$stateParams){
                    return FacultyService.getCover($stateParams.id)
                }
            }
        })
        .state('photo',{
            url: '/photo/:id',
            templateUrl: '/partial/admin/faculty/photo.html',
            controller: 'FacultyPhotoController',
            resolve : {
                faculty : function(FacultyService,$stateParams){
                    return FacultyService.getById($stateParams.id)
                },
                photos : function(FacultyService,$stateParams){
                    return FacultyService.getPhotos($stateParams.id)
                }

            }
        });


});

app.directive('holderFix', function () {
    return {
        link: function (scope, element, attrs) {
            Holder.run({ images: element[0], nocss: true });
        }
    };
});
