<?php

class NewsMobileApiController extends ApiBaseController {

	public function getIndex(){
        $newsList = News::with([])->get();
        return $this->ok($newsList);
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
