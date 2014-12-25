<?php

/**
 * Created by PhpStorm.
 * User: chaow
 * Date: 12/18/2014 AD
 * Time: 8:38 AM
 */

use Vinelab\NeoEloquent\Eloquent\SoftDeletingTrait;

class Faculty extends NeoEloquent{

    use SoftDeletingTrait;

    protected $label = ['Faculty'];

    protected $fillable = ['name_en', 'name_th'];

    public function cover(){
        return $this->hasOne('Photo','COVER');
    }

    public function photos(){
        return $this->hasMany('Photo','PHOTO');
    }

    public function logo(){
        return $this->hasOne("Photo","LOGO");
    }

    public function researchers(){
        return $this->hasMany('Researcher','HAS');
    }

} 