<?php

class FacultyMobileApiController extends ApiBaseController {

	public function getIndex(){
        $faculties = Faculty::with([])->get();

        return $this->ok($faculties);
	}

    public function getView($id){
        $id = (int) $id;
        $faculty = Faculty::with([])->find($id);
        if ($faculty){
            return $this->ok($faculty);
        }else {
            return $this->error(null,"Faculty id:$id is invalid");
        }
    }

    public function getCover($id){
        $id = (int) $id;
        $faculty = Faculty::find($id);
        $cover = $faculty->cover()->first();
        return $this->ok($cover);
    }

    public function getPhotos($id){
        $id = (int) $id;
        $faculty = Faculty::find($id);
        $cover = $faculty->photos()->get();
        return $this->ok($cover);
    }

    public function getSearchFaculty($text){
        $fuculty = Faculty::whereNull('deleted_at')
            ->whereNested(function($query) use ($text) {
                $query->orWhere('name_th', '=~', ".*(?i)$text.*");
                $query->orWhere('name_en', '=~', ".*(?i)$text.*");

            })
            ->take(10)
            ->get();
        return Response::json($fuculty);
    }

    public function getLogo($id){
        $id = (int) $id;
        $faculty = Faculty::find($id);
        $profilePhoto = $faculty->logo()->first();
        return $this->ok($profilePhoto);
    }
}
