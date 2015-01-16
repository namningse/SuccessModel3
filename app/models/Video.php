<?php

/**
 * Created by PhpStorm.
 * User: chaow
 * Date: 12/18/2014 AD
 * Time: 8:38 AM
 */

use Vinelab\NeoEloquent\Eloquent\SoftDeletingTrait;

class Video extends NeoEloquent{

    use SoftDeletingTrait;

    protected $label = ['Video'];

    protected $fillable = ['url'];

    public function project(){
        return $this->belongsTo('Project',"VIDEO");
    }

} 