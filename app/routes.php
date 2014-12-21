<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Blade::setContentTags('<%', '%>'); 		// for variables and all things Blade
Blade::setEscapedContentTags('<%%', '%%>'); 	// for escaped data


Route::get('/', function()
{
	return Redirect::to('/admin');
});

Route::get('/admin','HomeController@showAdminDashboard');
Route::get('/admin/faculty','HomeController@showAdminFaculty');
Route::get('/admin/news','HomeController@showAdminNews');
Route::get('/admin/researcher','HomeController@showAdminResearcher');

Route::controller('/admin/api/faculty','FacultyApiController');
Route::controller('/admin/api/news','NewsApiController');
Route::controller('/admin/api/researcher','ResearcherApiController');