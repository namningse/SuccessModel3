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

    protected function createPhoto($nodeid,$filename,$filetype,$base64){

        $fileurlpath = "/up/node/$nodeid/";
        $uppath = public_path()."/up/";
        $nodepath = $uppath."node/";
        $idpath = $nodepath.$nodeid;

        if (!File::exists($uppath)){
            File::makeDirectory($uppath);
        }
        if (!File::exists($nodepath)){
            File::makeDirectory($nodepath);
        }
        if (!File::exists($idpath)){
            File::makeDirectory($idpath);

        }

        if($filename){
            $filename = str_random(10)."_".$filename;
            $filefullname = $idpath."/".$filename;

            $photo = new Photo();
            $photo->filename = $filename;
            $photo->filetype = $filetype;

            $photo->url = $fileurlpath.$filename;

            File::put($filefullname,base64_decode($base64));

            return $photo;

        }
    }

    protected function createNormalPhoto($nodeid,$file){

        $fileurlpath = "/up/node/$nodeid/";
        $uppath = public_path()."/up/";
        $nodepath = $uppath."node/";
        $idpath = $nodepath.$nodeid;

        if (!File::exists($uppath)){
            File::makeDirectory($uppath);
        }
        if (!File::exists($nodepath)){
            File::makeDirectory($nodepath);
        }
        if (!File::exists($idpath)){
            File::makeDirectory($idpath);
        }

        $filename = $file->getClientOriginalName();
        $filename = str_random(10)."_".$filename;
        $filetype = $file->getMimeType();
        $destpath = $idpath;


        $photo = new Photo();
        $photo->filename = $filename;
        $photo->filetype = $filetype;
        $photo->url = $fileurlpath.$filename;

        $file->move($destpath,$filename);

        return $photo;
    }



}
