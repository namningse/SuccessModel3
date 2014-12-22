<?php

class HomeController extends BaseController {

	public function showAdminDashboard()
	{
		return View::make('admin.index');
	}

	public function showAdminFaculty(){
		return View::make('admin.faculty');
	}

    public function showAdminNews(){
        return View::make('admin.news');
    }

    public function showAdminResearcher(){
        return View::make('admin.researcher');
    }

    public function showAdminProject(){
        return View::make('admin.project');
    }
}
