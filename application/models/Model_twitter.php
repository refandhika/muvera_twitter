<?php
require_once(APPPATH.'third_party/ChromePhp.php');
	class Model_twitter extends CI_Model {
		
		function __construct() {
			parent::__construct();
		}
		
		function getCountHourly(){
			//date_default_timezone_set('UTC');
			//$date = date('Y-m-d H:i:s', time());
			//$k1 = "ahok";
			//$k2 = "sandiaga";
			//$k3 = "agus yudhoyono";
			//ChromePhp::log($date);
			$query = $this->db->query("SELECT * FROM count_hourly ORDER BY tanggal, jam");
			if ($query->num_rows() > 0) {
				//ChromePhp::log("Data Sent");
				return $query->result();
			}
			else {
				//ChromePhp::log("No Data");
				return NULL;
			}
		}
	}