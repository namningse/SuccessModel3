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
        $id = $faculty->id;
        return $this->ok($faculty,"Faculty [$id] has been save successfully.");
    }

    public function postDelete(){
        if (Input::has('id')){
            $id = (int) Input::get('id');
            $faculty = Faculty::find($id);
            $faculty->delete();

            return $this->ok(null,"Faculty [$id] has been delete successfully ");
        }
    }

    public function postSaveCover($id){

        if (Input::has('filename')) {
            $faculty = Faculty::find((int)$id);
            $filename = Input::get('filename');
            $filetype = Input::get('filetype');
            $base64 = Input::get('base64');

            $photo = $this->createPhoto($faculty->id, $filename, $filetype, $base64);
            $faculty->cover()->save($photo);
            //$faculty->photos()->save($photo);

            return $this->ok($photo, "Cover Photo has been updated.");
        }
    }

    public function postUploadPhoto($id){

        $id = (int)$id;
        $faculty = Faculty::find((int)$id);

        if(Input::hasFile('file')){
            $file = Input::file('file');
            $photo = $this->createNormalPhoto($id,$file);
        }
        $faculty->photos()->save($photo);

        return $this->ok($photo,"Photo has been upload successfully.");
    }

    public function postDeletePhoto($id){

        $pid = (int) Input::get('id');
        $faculty = Faculty::find((int)$id);
        $photo = Photo::find($pid);

        $faculty->photos()->detach([$pid]);

        $photo->delete();

        return $this->ok($photo,"Photo id $photo->id has been deleted.");
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
        $faculty = Faculty::whereNull('deleted_at')
            ->whereNested(function($query) use ($text) {
                $query->orWhere('name_th', '=~', ".*(?i)$text.*");
                $query->orWhere('name_en', '=~', ".*(?i)$text.*");

            })
            ->take(10)
            ->get();
        return Response::json($faculty);
    }


    public function postSaveLogo($id){
        if (Input::has('filename')) {
            $faculty = Faculty::find((int)$id);
            $filename = Input::get('filename');
            $filetype = Input::get('filetype');
            $base64 = Input::get('base64');

            $photo = $this->createPhoto($faculty->id, $filename, $filetype, $base64);
            $faculty->logo()->save($photo);
            //$researcher->photos()->save($photo);

            return $this->ok($photo, "Cover Photo has been updated.");
        }
    }

    public function getLogo($id){
        $id = (int) $id;
        $faculty = Faculty::find($id);
        $profilePhoto = $faculty->logo()->first();
        return $this->ok($profilePhoto);
    }
}
