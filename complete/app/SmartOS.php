<?php
if (! function_exists('components'))
{
	function components($file,$data=[]){
		return view("\App\Views\components\\".$file,$data);
	}
}