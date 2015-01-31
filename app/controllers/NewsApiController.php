<?php

class NewsApiController extends ApiBaseController {

	public function getIndex(){
        $skip=0;
        $take=10;
        $newsList = News::with([])->take($take)->skip($skip)->get();

        $data = [
            "data" => $newsList,
            "skip" => $skip,
            "take" => $take,
            "count" => $newsList->count(),
            "total" => News::all()->count()
        ];

        return $this->ok($data);
	}

    public function postFilter(){

        $skip=Input::get('skip');
        $take=Input::get('take');
        $newsList = News::with([])->take($take)->skip($skip)->get();

        $data = [
            "data" => $newsList,
            "skip" => $skip,
            "take" => $take,
            "count" => $newsList->count(),
            "total" => News::all()->count()
        ];

        return $this->ok($data);

    }

    public function getView($id){
        $id = (int) $id;
        $news = News::with([])->find($id);
        if ($news){
            return $this->ok($news);
        }else {
            return $this->error(null,"News id:$id is invalid");
        }
    }

    public function postSave(){


        if(Input::has('id')){
            $id = (int) Input::get('id');
            $news = News::find($id);
            $news->update(Input::all());
        }else {
            $news = News::firstOrNew(Input::all());
        }
        $news->save();
        $id = $news->id;
        return $this->ok($news,"News [$id] has been save successfully.");
    }

    public function postDelete(){
        if (Input::has('id')){
            $id = (int) Input::get('id');
            $news = News::find($id);
            $news->delete();

            return $this->ok(null,"News [$id] has been delete successfully ");
        }
    }

    public function postSaveCover($id){

        if (Input::has('filename')) {
            $news = News::find((int)$id);
            $filename = Input::get('filename');
            $filetype = Input::get('filetype');
            $base64 = Input::get('base64');

            $photo = $this->createPhoto($news->id, $filename, $filetype, $base64);
            $news->cover()->save($photo);
            $news->photos()->save($photo);

            return $this->ok($photo, "Cover Photo has been updated.");
        }
    }

    public function postUploadPhoto($id){

        $id = (int)$id;
        $news = News::find((int)$id);

        if(Input::hasFile('file')){
            $file = Input::file('file');
            $photo = $this->createNormalPhoto($id,$file);
        }
        $news->photos()->save($photo);

        return $this->ok($photo,"Photo has been upload successfully.");
    }

    public function postDeletePhoto($id){

        $pid = (int) Input::get('id');
        $news = News::find((int)$id);
        $photo = Photo::find($pid);

        $news->photos()->detach([$pid]);
        $photo->delete();

        return $this->ok($photo,"Photo id $photo->id has been deleted.");
    }

    public function getCover($id){
        $id = (int) $id;
        $news = News::find($id);
        $cover = $news->cover()->first();
        return $this->ok($cover);
    }

    public function getPhotos($id){
        $id = (int) $id;
        $news = News::find($id);
        $cover = $news->photos()->get();
        return $this->ok($cover);
    }
}
