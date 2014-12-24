/**
 * Created by chaow on 12/17/2014 AD.
 */

var app = angular.module("ResearcherApp", ['ui.router','ngLoadingSpinner','ui.bootstrap','naif.base64','angularFileUpload']);



app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/list");


    $stateProvider
        .state('list', {
            url: "/list",
            templateUrl: "/partial/admin/researcher/researcher_list.html",
            controller: 'ResearcherListController',
            resolve : {
                researcherList : function(ResearcherService){
                    return ResearcherService.getAll();
                }
            }
        })
        .state('add',{
            url : '/add',
            templateUrl: '/partial/admin/researcher/researcher_form.html',
            controller: 'ResearcherFormController',
            resolve : {
                researcher : function(){
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
            templateUrl: '/partial/admin/researcher/researcher_form.html',
            controller: 'ResearcherFormController',
            resolve : {
                researcher : function(ResearcherService,$stateParams){
                    return ResearcherService.getById($stateParams.id)
                }
            }

        })
        .state('cover',{
            url: '/cover/:id',
            templateUrl: '/partial/admin/researcher/researcher_cover.html',
            controller: 'ResearcherCoverController',
            resolve : {
                researcher : function(ResearcherService,$stateParams){
                    return ResearcherService.getById($stateParams.id)
                },
                cover : function(ResearcherService,$stateParams){
                    return ResearcherService.getCover($stateParams.id)
                }
            }
        })
        .state('profilePhoto',{
            url: '/profile-photo/:id',
            templateUrl: '/partial/admin/researcher/researcher_profile_photo.html',
            controller: 'ResearcherProfilePhotoController',
            resolve : {
                researcher : function(ResearcherService,$stateParams){
                    return ResearcherService.getById($stateParams.id)
                },
                profilePhoto : function(ResearcherService,$stateParams){
                    return ResearcherService.getProfilePhoto($stateParams.id)
                }
            }
        })
        .state('photo',{
            url: '/photo/:id',
            templateUrl: '/partial/admin/researcher/researcher_photo.html',
            controller: 'ResearcherPhotoController',
            resolve : {
                researcher : function(ResearcherService,$stateParams){
                    return ResearcherService.getById($stateParams.id)
                },
                photos : function(ResearcherService,$stateParams){
                    return ResearcherService.getPhotos($stateParams.id)
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
