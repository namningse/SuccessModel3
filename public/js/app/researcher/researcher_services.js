/**
 * Created by chaow on 12/18/2014 AD.
 */


app.factory('ResearcherService', function ($http,FileUploader) {

    return {
        getAll : function(){
            return $http.get('/admin/api/researcher');
        },

        getById : function($id){
            return $http.get('/admin/api/researcher/view/'+$id);
        },
        save: function ($researcher) {
            return $http({
                url: '/admin/api/researcher/save',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($researcher)
            });
        },
        delete : function($researcher){
            return $http({
                url: '/admin/api/researcher/delete',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($researcher)
            })
        },
        saveCover : function($researcher,$image){
            return $http({
                url: '/admin/api/researcher/save-cover/'+$researcher.id,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($image)
            })
        },
        getCover : function($id){
            return $http({
                url: '/admin/api/researcher/cover/'+$id,
                method: 'get',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        saveProfilePhoto : function($researcher,$image){
            return $http({
                url: '/admin/api/researcher/save-profile-photo/'+$researcher.id,
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($image)
            })
        },
        getProfilePhoto : function($id){
            return $http({
                url: '/admin/api/researcher/profile-photo/'+$id,
                method: 'get',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        getPhotos : function($id){
            return $http({
                url: '/admin/api/researcher/photos/'+$id,
                method: 'get',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        deletePhoto : function($id,$photo){
            return $http({
                url: '/admin/api/researcher/delete-photo/'+$id,
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($photo)
            })
        },
        getUploader : function($id){
            uploader = new FileUploader({
                url: '/admin/api/researcher/upload-photo/' + $id
            });
            return uploader;
        },
        getImportUploader : function($id){
            uploader = new FileUploader({
                url: '/admin/api/researcher/upload-import-file'
            });
            return uploader;
        },
        confirmImport : function($researchers){

            return $http({
                url: '/admin/api/researcher/import',
                method: 'post',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($researchers)
            })
        },
        getSearch : function($text){
            return $http({
                url: '/admin/api/researcher/search/'+$text,
                method: 'get',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }


    }
});
