<?php
namespace App\Controllers;
use App\Models\TraderModel;
class Exchange extends BaseController
{
	private $query;
	public function __construct(){
		$this->query = new TraderModel;
	}
    public function index()
    {
        // check if already logged in.
		if (!logged_in())
		{
			return redirect()->route('login');
		}
		$search = $this->request->getGet('fillter');

        $data = $this->query->getSignal($search);
        $finish = $this->query->getSignalFinish();
		return view('pages/exchange',["data" => $data, "finish" => $finish, "header" => ["title" => "Smart Signal"]]);
	}

	
	public function api($type=""){
		$data  = json_decode($this->request->getGet('query'));
		
		if($type == "create"){
			$arv = [
				
				"symbol" => $data->symbol, 
				"type" => $data->type, 
				"open" => $data->open,
				"open_2" => $data->dca1, 
				"open_3" => $data->dca2, 
				"sl" => $data->sl, 
				"tp" => $data->tp,
				"tp_2" => $data->tp2, 
				"tp_3" => $data->tp3,  
				"message_id" => $data->telegram,
				"message_id_group" => $data->relymsg,
				"timefream" => $data->tf, 
				"chart" => ""
			];

			$this->query->createOrder($arv);
			$client = \Config\Services::curlrequest();

			$client->request('post', 'http://localhost:7000/signal', ["json" => $arv]);
			echo json_encode(["status" => "ok"]);
		}


		if($type == "finish"){
			$arv = [
				"target" => $data->target,
				"pip" => $data->pip,
				"close" => $data->close_at,
				"close_type" => strtolower($data->type),
				"usd" => $data->usd,
				"message_id" => $data->telegram
			];
			$arvObj = $this->query->finishOrder((Object)$arv);
			$client->request('post', 'http://localhost:7000/finish', ["json" => $arvObj]);
			echo json_encode(["status" => "ok"]);
		}
	}
}