<?php

class HomeController extends BaseController {

	public function showAdminDashboard()
	{
		return View::make('admin.index');
	}

	public function showAdminFaculty(){
		return View::make('admin.faculty');
	}

}
