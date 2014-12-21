<?php

/**
 * Created by PhpStorm.
 * User: chaow
 * Date: 12/18/2014 AD
 * Time: 8:38 AM
 */

use Vinelab\NeoEloquent\Eloquent\SoftDeletingTrait;

class Researcher extends NeoEloquent{

    use SoftDeletingTrait;

    protected $label = ['Researcher'];

    protected $fillable = ['title', 'firstname','lastname'];

    public function cover(){
        return $this->hasOne('Photo','COVER');
    }

    public function photos(){
        return $this->hasMany('Photo','PHOTO');
    }

    public function faculty(){
        return $this->belongsTo("Faculty");
    }

} 