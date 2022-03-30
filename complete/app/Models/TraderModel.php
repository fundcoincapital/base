<?php namespace App\Models;

use CodeIgniter\Model;


class TraderModel extends Model
{
	protected $table = 'trader_signal';
    protected $primaryKey = 'id';
	public function getSignal($s=""){
		$query = $this->db->table('trader_signal');
		if($s != ""){
			$query->like("symbol",$s);
		}
		$query->orderBy("id","DESC");
		$query = $query->get(10);
		return $query->getResult();

	}

	public function getSignalFinish(){
		$query = $this->db->table('trader_signal_finish')->orderBy("id","DESC")->get(10);
		return $query->getResult();

	}

	public function createOrder($obj){
		//print_r($obj);
		$this->db->table('trader_signal')->insert($obj);
	}

	public function test(){
		$info = $this->db->table('trader_signal')->where(["message_id" => 1699])->get(1)->getResult()[0];
		print_r($info);
	}

	public function finishOrder($obj){
		$info = $this->db->table('trader_signal')->where(["message_id" => $obj->message_id])->get(1)->getResult()[0];
		
		if(!$info) return false;

		
		$action = $obj->close_type;
		if($action == "sl" || $obj->target > 2){
			$this->db->table('trader_signal')->where(["message_id" => $obj->message_id])->delete();//Remove Complete Order
		}
		$arv = [
				"signals_id" => $info->id,
				"type" => $info->type,
				"symbol" => $info->symbol,
				"open" => $info->open,
				"opentime" => $info->opentime,
				"sl" => $info->sl,
				"close_at" => $obj->close,
				"close_time" => date("Y-m-d h:i:s"),
				"profit_pip" => $obj->pip,
				"profit_usd" => $obj->usd,
				"close_type" => ($obj->close_type == "sl" || $obj->close_type == "tp" ?  strtoupper($obj->close_type) : "Close"),
				"message_id" => $info->message_id,
				"is_access" => $obj->target < 2 ? "Free" : "Vip"
			];
		
		if($info) $this->db->table('trader_signal_finish')->insert($arv);
		return $arv;
	}
}

