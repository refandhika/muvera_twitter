<?php
require_once(APPPATH.'third_party/ChromePhp.php');
defined('BASEPATH') OR exit('No direct script access allowed');

class Twitter extends CI_Controller {

	public function index()
	{
		$data['title'] = 'Twitter Monitoring';

		$this->load->view('template/header', $data);
		$this->load->view('apps/chart1', $data);
		$this->load->view('apps/chart2', $data);
		$this->load->view('apps/chart3', $data);
		$this->load->view('apps/chart4', $data);
		$this->load->view('template/footer', $data);

		$this->getData();

	}

	private function getData()
	{
		$this->load->model('model_twitter');

		$result = $this->model_twitter->getCountHourly();
		$fp = fopen('application/generate_data/count_hourly.json', 'w');

		$check_tgl = '';
		$check_jam = '';

		if($result){
			foreach ($result as $row){
				//$aj[] = $row;
				if($row->tokoh == 'Ahok'){
					$tweet_ahok = $row->tweet;
				}
				else if($row->tokoh == 'Djarot Saiful'){
					$tweet_djarot = $row->tweet;
				}
				else if($row->tokoh == 'Anies Baswedan'){
					$tweet_anies = $row->tweet;
				}
				else if($row->tokoh == 'Sandiaga Uno'){
					$tweet_uno = $row->tweet;
				}
				else if($row->tokoh == 'Agus Yudhoyono'){
					$tweet_agus = $row->tweet;
				}
				else if($row->tokoh == 'Sylviana Murni'){
					$tweet_murni = $row->tweet;
				};

				if ($check_tgl == $row->tanggal AND $check_jam == $row->jam AND $row->tokoh == 'Djarot Saiful'){
					$tweet_sum = $tweet_ahok + $tweet_djarot;
					$aj[] = array(
						'pasangan' => 'Ahok - Djarot',
						'data' => array(
							'jam' => $row->tanggal . " " . $row->jam,
							'tweet' => $tweet_sum
							)
					);
				}
				else if ($check_tgl == $row->tanggal AND $check_jam == $row->jam AND $row->tokoh == 'Sandiaga Uno'){
					$tweet_sum = $tweet_anies + $tweet_uno;
					$aj[] = array(
						'pasangan' => 'Anies - Uno',
						'data' => array(
							'jam' => $row->tanggal . " " . $row->jam,
							'tweet' => $tweet_sum
							)
					);
				}
				else if ($check_tgl == $row->tanggal AND $check_jam == $row->jam AND $row->tokoh == 'Sylviana Murni'){
					$tweet_sum = $tweet_agus + $tweet_murni;
					$aj[] = array(
						'pasangan' => 'Agus - Murni',
						'data' => array(
							'jam' => $row->tanggal . " " . $row->jam,
							'tweet' => $tweet_sum
							)
					);
				};
				$check_tgl = $row->tanggal;
				$check_jam = $row->jam;
				//ChromePhp::log($array);
			}
		}

		fwrite($fp, json_encode($aj,TRUE));
		fclose($fp);
	}
}
