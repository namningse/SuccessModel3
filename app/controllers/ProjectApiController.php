<?php

class ProjectApiController extends ApiBaseController {

	public function getIndex(){
        $projects = Project::with(['faculty','researchers'])->get();
        return $this->ok($projects);
	}

    public function getView($id){
        $id = (int) $id;
        $project = Project::with(['faculty','researchers'])->find($id);
        if ($project){
            return $this->ok($project);
        }else {
            return $this->error(null,"Project id:$id is invalid");
        }
    }

    public function postSave(){


        if(Input::has('id')){
            $id = (int) Input::get('id');
            $project = Project::find($id);
            $project->update(Input::all());

        }else {
            $project = Project::firstOrNew(Input::except(['faculty']));
        }
        $project->save();

        if(Input::has('faculty')){
            $fid = (int) Input::get('faculty.id');
            $faculty = Faculty::find($fid);

            $project->setFaculty($faculty);

        }else {
            $project->setFaculty(null);
        }


        if (Input::has('researchers')) {
            $researchers = Input::get('researchers');
            $r_ids = [];
            foreach ($researchers as $r) {
                array_push($r_ids, (int) $r['id']);
            }
            $project->researchers()->sync($r_ids);
        } else {
            $project->researchers()->sync([]);
        }


        $id = $project->id;
        return $this->ok($project,"Project [$id] has been save successfully.");
    }

    public function postDelete(){
        if (Input::has('id')){
            $id = (int) Input::get('id');
            $project = Project::find($id);
            $project->delete();

            return $this->ok(null,"Project [$id] has been delete successfully ");
        }
    }

    public function postSaveCover($id){

        if (Input::has('filename')) {
            $project = Project::find((int)$id);
            $filename = Input::get('filename');
            $filetype = Input::get('filetype');
            $base64 = Input::get('base64');

            $photo = $this->createPhoto($project->id, $filename, $filetype, $base64);
            $project->cover()->save($photo);
            //$project->photos()->save($photo);

            return $this->ok($photo, "Cover Photo has been updated.");
        }
    }

    public function postUploadPhoto($id){

        $id = (int)$id;
        $project = Project::find((int)$id);

        if(Input::hasFile('file')){
            $file = Input::file('file');
            $photo = $this->createNormalPhoto($id,$file);
        }
        $project->photos()->save($photo);

        return $this->ok($photo,"Photo has been upload successfully.");
    }

    public function postDeletePhoto($id){

        $pid = (int) Input::get('id');
        $project = Project::find((int)$id);
        $photo = Photo::find($pid);

        $project->photos()->detach([$pid]);

        $photo->delete();

        return $this->ok($photo,"Photo id $photo->id has been deleted.");
    }

    public function getCover($id){
        $id = (int) $id;
        $project = Project::find($id);
        $cover = $project->cover()->first();
        return $this->ok($cover);
    }

    public function getPhotos($id){
        $id = (int) $id;
        $project = Project::find($id);
        $cover = $project->photos()->get();
        return $this->ok($cover);
    }

    public function getSearchProject($text){
        $fuculty = Project::whereNull('deleted_at')
            ->whereNested(function($query) use ($text) {
                $query->orWhere('name_th', '=~', ".*(?i)$text.*");
                $query->orWhere('name_en', '=~', ".*(?i)$text.*");

            })
            ->take(10)
            ->get();
        return Response::json($fuculty);
    }

    public function postSaveFulltext($id){

        $id = (int)$id;
        $project = Project::find((int)$id);

        if(Input::hasFile('file')){
            $file = Input::file('file');
            $fulltextfile = $this->createFile($id,$file);
            $fulltextfile->save();
            $project->fulltext()->save($fulltextfile);
            return $this->ok($fulltextfile,"FullText File has been upload successfully.");
        }

        return $this->error(null,"Fulltext file cannot be upload.");
    }

    public function getFullText($id){
        $id = (int)$id;
        $project = Project::find((int)$id);

        $fulltext = $project->fulltext()->first();

        return $this->ok($fulltext);
    }
}
