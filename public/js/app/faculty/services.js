/**
 * Created by chaow on 12/18/2014 AD.
 */


app.factory('FacultyService', function ($http) {

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
        }


    }
});
