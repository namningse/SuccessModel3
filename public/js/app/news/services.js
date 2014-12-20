/**
 * Created by chaow on 12/18/2014 AD.
 */


app.factory('NewsService', function ($http) {

    return {
        getAll : function(){
            return $http.get('/admin/api/news');
        },

        getById : function($id){
            return $http.get('/admin/api/news/view/'+$id);
        },
        save: function ($news) {
            return $http({
                url: '/admin/api/news/save',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($news)
            });
        },
        delete : function($news){
            return $http({
                url: '/admin/api/news/delete',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($news)
            })
        },
        saveCover : function($news,$image){
            return $http({
                url: '/admin/api/news/save-cover/'+$news.id,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($image)
            })
        },
        getCover : function($id){
            return $http({
                url: '/admin/api/news/cover/'+$id,
                method: 'get',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        getPhotos : function($id){
            return $http({
                url: '/admin/api/news/photos/'+$id,
                method: 'get',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }


    }
});
