<?php

class ResearcherMobileApiController extends ApiBaseController {

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
