/**
 * Created by chaow on 12/18/2014 AD.
 */


app.factory('FacultyService', function ($http,FileUploader) {

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
        },
        delete : function($faculty){
            return $http({
                url: '/admin/api/faculty/delete',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($faculty)
            })
        },
        saveCover : function($faculty,$image){
            return $http({
                url: '/admin/api/faculty/save-cover/'+$faculty.id,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($image)
            })
        },
        getCover : function($id){
            return $http({
                url: '/admin/api/faculty/cover/'+$id,
                method: 'get',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        getPhotos : function($id){
            return $http({
                url: '/admin/api/faculty/photos/'+$id,
                method: 'get',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        deletePhoto : function($id,$photo){
            return $http({
                url: '/admin/api/faculty/delete-photo/'+$id,
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($photo)
            })
        },
        getUploader : function($id){
            uploader = new FileUploader({
                url: '/admin/api/faculty/upload-photo/' + $id
            });
            return uploader;
        },
        getSearch : function($text){
            return $http({
                url: '/admin/api/faculty/search-faculty/'+$text,
                method: 'get',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            })
        }



    }
});
