<?php

class ApiBaseController extends Controller {

    protected function ok($data,$message = null){

        return [
            "success" => true,
            "data" => $data,
            "message" => $message
        ];

    }

    protected  function error($data=null,$message=null){
        return [
            "success" => false,
            "data" => $data,
            "message" => $message
        ];
    }

}
