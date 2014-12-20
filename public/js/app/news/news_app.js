/**
 * Created by chaow on 12/17/2014 AD.
 */

var app = angular.module("NewsApp", ['ui.router','ngLoadingSpinner','ui.bootstrap','naif.base64']);



app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/list");


    $stateProvider
        .state('list', {
            url: "/list",
            templateUrl: "/partial/admin/news/news_list.html",
            controller: 'NewsListController',
            resolve : {
                newsList : function(NewsService){
                    return NewsService.getAll();
                }
            }
        })
        .state('add',{
            url : '/add',
            templateUrl: '/partial/admin/news/news_form.html',
            controller: 'NewsFormController',
            resolve : {
                news : function(){
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
            templateUrl: '/partial/admin/news/news_form.html',
            controller: 'NewsFormController',
            resolve : {
                news : function(NewsService,$stateParams){
                    return NewsService.getById($stateParams.id)
                }
            }

        })
        .state('cover',{
            url: '/cover/:id',
            templateUrl: '/partial/admin/news/news_cover.html',
            controller: 'NewsCoverController',
            resolve : {
                news : function(NewsService,$stateParams){
                    return NewsService.getById($stateParams.id)
                },
                cover : function(NewsService,$stateParams){
                    return NewsService.getCover($stateParams.id)
                }
            }
        })
        .state('photo',{
            url: '/photo/:id',
            templateUrl: '/partial/admin/news/news_photo.html',
            controller: 'NewsPhotoController',
            resolve : {
                news : function(NewsService,$stateParams){
                    return NewsService.getById($stateParams.id)
                },
                photos : function(NewsService,$stateParams){
                    return NewsService.getPhotos($stateParams.id)
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
