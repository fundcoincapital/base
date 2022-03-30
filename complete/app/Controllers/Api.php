<?php
 
namespace App\Controllers;
 
use CodeIgniter\RESTful\ResourceController;
 
class Api extends ResourceController
{
    //protected $modelName = 'App\Models\ProjectModel';
    protected $format    = 'json';
    public $arv = ["status" => "ok","msg" => "no msg"];
    public function index()
    {
        return $this->respond($this->arv, 200);
    }
    public function show($id = NULL)
    {
        $this->arv["msg"] = "Show";
        return $this->respond($this->arv, 200);
    }
    public function create()
    {
        return $this->respond($this->arv, 200);
    }
    public function update($id = NULL)
    {
        return $this->respond($this->arv, 200);
    }
    public function delete($id = NULL)
    {
        return $this->respond($this->arv, 200);
    }
}