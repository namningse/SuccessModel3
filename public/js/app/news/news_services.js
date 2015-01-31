/**
 * Created by chaow on 12/18/2014 AD.
 */


app.factory('NewsService', function ($http,FileUploader) {

    return {
        getAll : function(){
            return $http.get('/admin/api/news');
        },
        postFilter : function(data){
            return $http({
                url: '/admin/api/news/filter',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(data)
            });
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
        },
        deletePhoto : function($id,$photo){
            return $http({
                url: '/admin/api/news/delete-photo/'+$id,
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($photo)
            })
        },
        getUploader : function($id){
            uploader = new FileUploader({
                url: '/admin/api/news/upload-photo/' + $id
            });
            return uploader;
        }
    }
});
