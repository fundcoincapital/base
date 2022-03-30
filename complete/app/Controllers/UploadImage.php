<?php 

namespace App\Controllers;

use CodeIgniter\Controller;


class UploadImage extends Controller
{

    public function index() 
	{
        return view('index');
    }

    function uploadImage() { 
        
        helper(['form', 'url']);

        $database = \Config\Database::connect();
        $db = $database->table('profile');
    
        $file = $this->validate([
            'file' => [
                'uploaded[file]',
                'mime_in[file, image/png, image/jpg, image/jpeg]',
                'max_size[file,4096]',
            ]
        ]);
    
        if (!$file) {
            print_r('Wrong file type selected');
        } else {
            $imageFile = $this->request->getFile('file');
            $imageFile->move(WRITEPATH . 'uploads');
    
            $data = [
               'ile_name' =>  $imageFile->getName(),
               'file_type'  => $imageFile->getClientMimeType()
            ];
    
            $save = $db->insert($data);
            print_r('Image uploaded correctly!');        
        }

    }
 
}