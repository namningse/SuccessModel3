/**
 * Created by chaow on 12/17/2014 AD.
 */

var app = angular.module("ProjectApp", ['ui.router','ngLoadingSpinner','ui.bootstrap','naif.base64','angularFileUpload']);



app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/list");


    $stateProvider
        .state('list', {
            url: "/list",
            templateUrl: "/partial/admin/project/project_list.html",
            controller: 'ProjectListController',
            resolve : {
                projectList : function(ProjectService){
                    return ProjectService.getAll();
                }
            }
        })
        .state('add',{
            url : '/add',
            templateUrl: '/partial/admin/project/project_form.html',
            controller: 'ProjectFormController',
            resolve : {
                project : function(){
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
            templateUrl: '/partial/admin/project/project_form.html',
            controller: 'ProjectFormController',
            resolve : {
                project : function(ProjectService,$stateParams){
                    return ProjectService.getById($stateParams.id)
                }
            }

        })
        .state('cover',{
            url: '/cover/:id',
            templateUrl: '/partial/admin/project/project_cover.html',
            controller: 'ProjectCoverController',
            resolve : {
                project : function(ProjectService,$stateParams){
                    return ProjectService.getById($stateParams.id)
                },
                cover : function(ProjectService,$stateParams){
                    return ProjectService.getCover($stateParams.id)
                }
            }
        })
        .state('photo',{
            url: '/photo/:id',
            templateUrl: '/partial/admin/project/project_photo.html',
            controller: 'ProjectPhotoController',
            resolve : {
                project : function(ProjectService,$stateParams){
                    return ProjectService.getById($stateParams.id)
                },
                photos : function(ProjectService,$stateParams){
                    return ProjectService.getPhotos($stateParams.id)
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
