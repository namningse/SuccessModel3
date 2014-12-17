<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends NeoEloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;

	protected $label = ['user'];

	protected $hidden = array('password', 'remember_token');

	protected $fillable = [
		'username',
		'email',
		'title',
		'firstname',
		'lastname',
	];

}
