<?php

class FacultyApiController extends ApiBaseController {

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

    public function postSave(){


        if(Input::has('id')){
            $id = (int) Input::get('id');
            $faculty = Faculty::find($id);
            $faculty->update(Input::all());
        }else {
            $faculty = Faculty::firstOrNew(Input::all());
        }
        $faculty->save();
        return $this->ok($faculty,"Faculty [$id] has been save successfully.");
    }
}
