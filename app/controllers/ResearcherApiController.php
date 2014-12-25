<?php

class ResearcherApiController extends ApiBaseController {

	public function getIndex(){
        $researchers = Researcher::with(['faculty'])->get();



        return $this->ok($researchers);
	}

    public function getView($id){
        $id = (int) $id;
        $researcher = Researcher::with(['faculty'])->find($id);
        if ($researcher){
            return $this->ok($researcher);
        }else {
            return $this->error(null,"Researcher id:$id is invalid");
        }
    }

    public function postSave(){


        if(Input::has('id')){
            $id = (int) Input::get('id');
            $researcher = Researcher::find($id);
            $researcher->update(Input::except('faculty'));

        }else {
            $researcher = Researcher::firstOrNew(Input::except('faculty'));
        }

        $researcher->save();
        $id = $researcher->id;

        if(Input::has('faculty')){
            $fid = (int) Input::get('faculty.id');
            $faculty = Faculty::find($fid);
            $researcher->faculty()->associate($faculty)->save();
        }else {

            $faculty = $researcher->faculty()->first();
            if($faculty){
                $faculty->researchers()->detach([$researcher->id]);
            }

        }
        return $this->ok($researcher,"Researcher [$id] has been save successfully.");
    }

    public function postDelete(){
        if (Input::has('id')){
            $id = (int) Input::get('id');
            $researcher = Researcher::find($id);
            $researcher->delete();

            return $this->ok(null,"Researcher [$id] has been delete successfully ");
        }
    }

    public function postSaveCover($id){

        if (Input::has('filename')) {
            $researcher = Researcher::find((int)$id);
            $filename = Input::get('filename');
            $filetype = Input::get('filetype');
            $base64 = Input::get('base64');

            $photo = $this->createPhoto($researcher->id, $filename, $filetype, $base64);
            $researcher->cover()->save($photo);
            //$researcher->photos()->save($photo);

            return $this->ok($photo, "Cover Photo has been updated.");
        }
    }

    public function postSaveProfilePhoto($id){
        if (Input::has('filename')) {
            $researcher = Researcher::find((int)$id);
            $filename = Input::get('filename');
            $filetype = Input::get('filetype');
            $base64 = Input::get('base64');

            $photo = $this->createPhoto($researcher->id, $filename, $filetype, $base64);
            $researcher->profilePhoto()->save($photo);
            //$researcher->photos()->save($photo);

            return $this->ok($photo, "Cover Photo has been updated.");
        }
    }

    public function postUploadPhoto($id){

        $id = (int)$id;
        $researcher = Researcher::find((int)$id);

        if(Input::hasFile('file')){
            $file = Input::file('file');
            $photo = $this->createNormalPhoto($id,$file);
        }
        $researcher->photos()->save($photo);

        return $this->ok($photo,"Photo has been upload successfully.");
    }

    public function postDeletePhoto($id){

        $pid = (int) Input::get('id');
        $researcher = Researcher::find((int)$id);
        $photo = Photo::find($pid);

        $researcher->photos()->detach([$pid]);

        $photo->delete();

        return $this->ok($photo,"Photo id $photo->id has been deleted.");
    }

    public function getCover($id){
        $id = (int) $id;
        $researcher = Researcher::find($id);
        $cover = $researcher->cover()->first();
        return $this->ok($cover);
    }

    public function getProfilePhoto($id){
        $id = (int) $id;
        $researcher = Researcher::find($id);
        $profilePhoto = $researcher->profilePhoto()->first();
        return $this->ok($profilePhoto);
    }

    public function getPhotos($id){
        $id = (int) $id;
        $researcher = Researcher::find($id);
        $cover = $researcher->photos()->get();
        return $this->ok($cover);
    }

    public function getSearch($text) {

        $researcher = Researcher::whereNull('deleted_at')
            ->whereNested(function($query) use ($text) {
                $query->orWhere('firstname', '=~', ".*(?i)$text.*");
                $query->orWhere('lastname', '=~', ".*(?i)$text.*");
                $query->orWhere('title', '=~', ".*(?i)$text.*");
            })
            ->take(10)
            ->get();
        return Response::json($researcher);
    }
}
