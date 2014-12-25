/**
 * Created by chaow on 12/18/2014 AD.
 */


app.factory('ProjectService', function ($http,FileUploader) {

    return {
        getAll : function(){
            return $http.get('/admin/api/project');
        },

        getById : function($id){
            return $http.get('/admin/api/project/view/'+$id);
        },
        save: function ($project) {
            return $http({
                url: '/admin/api/project/save',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($project)
            });
        },
        delete : function($project){
            return $http({
                url: '/admin/api/project/delete',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($project)
            })
        },
        saveCover : function($project,$image){
            return $http({
                url: '/admin/api/project/save-cover/'+$project.id,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($image)
            })
        },
        getCover : function($id){
            return $http({
                url: '/admin/api/project/cover/'+$id,
                method: 'get',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        getPhotos : function($id){
            return $http({
                url: '/admin/api/project/photos/'+$id,
                method: 'get',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        deletePhoto : function($id,$photo){
            return $http({
                url: '/admin/api/project/delete-photo/'+$id,
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($photo)
            })
        },
        getUploader : function($id){
            uploader = new FileUploader({
                url: '/admin/api/project/upload-photo/' + $id
            });
            return uploader;
        },
        getFullTextUploader : function($id){
            uploader = new FileUploader({
                url: '/admin/api/project/save-fulltext/' + $id
            });
            return uploader;
        },
        getSearch : function($text){
            return $http({
                url: '/admin/api/project/search-project/'+$text,
                method: 'get',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            })
        },
        getFullText : function($id){
            return $http({
                url: '/admin/api/project/full-text/'+$id,
                method: 'get',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }



    }
});
