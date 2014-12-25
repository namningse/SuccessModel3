<?php

/**
 * Created by PhpStorm.
 * User: chaow
 * Date: 12/18/2014 AD
 * Time: 8:38 AM
 */

use Vinelab\NeoEloquent\Eloquent\SoftDeletingTrait;

class Project extends NeoEloquent{

    use SoftDeletingTrait;

    protected $label = ['Project'];

    protected $fillable = ['name_en', 'name_th','executive_summary'];

    public function cover(){
        return $this->hasOne('Photo','COVER');
    }

    public function photos(){
        return $this->hasMany('Photo','PHOTO');
    }

    public function faculty(){
        return $this->belongsTo("Faculty","HAS");
    }

    public function researchers(){
        return $this->hasMany('Researcher','HAS');
    }


    public function setFaculty($faculty){
        if ($faculty == null){
            $faculty = $this->faculty()->first();
            if($faculty != null){
                $faculty->researchers()->detach([$this->id]);
            }
        }else {
            $this->faculty()->associate($faculty)->save();
        }
    }

} 