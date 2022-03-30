<?php
namespace App\Controllers;

class Profile extends BaseController
{
    public function index()
    {
        // check if already logged in.
		if (!logged_in())
		{
			return redirect()->back();
		}

        

		return view('pages/profile');
	}

	public function attemptProfile(){

	}
}