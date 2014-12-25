<?php

/**
 * Created by PhpStorm.
 * User: chaow
 * Date: 12/18/2014 AD
 * Time: 8:38 AM
 */

use Vinelab\NeoEloquent\Eloquent\SoftDeletingTrait;

class FileProject extends NeoEloquent{

    use SoftDeletingTrait;

    protected $label = ['File'];

    //protected $fillable = ['name_en', 'name_th'];

    public function project(){
        return $this->belongsTo('Project',"FULLTEXT");
    }

} 