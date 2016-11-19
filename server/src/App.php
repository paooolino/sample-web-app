<?php

namespace SlimRest;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use RedBeanPHP\R as R;

/**
 *	The main API Application class.
 */
class App {
	
	/** 
	 *	The Slim Application.
	 */
	private $slim;
	private $players_names;
	private $players_surnames;
	
	/**
	 *	The constructor.
	 */
	public function __construct() {
		$this->slim = new \Slim\App(array(
			"settings" => array(
				"displayErrorDetails" => true,
			)
		));
		
		R::setup( 'mysql:host='. Config\DB_HOST .';dbname=' . Config\DB_NAME, Config\DB_USER, Config\DB_PASS );
		
		$this->setRoutes();
		
		$this->players_names = file(Config\DATA_DIR . '/names/names_IT_M.txt');
		$this->players_surnames = file(Config\DATA_DIR . '/names/surnames_IT_M.txt');
	}
	
	/**
	 *	Set the unique route for the endpoint App.
	 */	
	private function setRoutes() {
		$this->slim->post('/', array($this, 'route'));
		$this->slim->get('/populate', array($this, 'populate'));
	}
	
	public function route(Request $request, Response $response) {
		$data = json_decode($request->getBody());
		
		switch($data->action) {
			case "season/FETCH_REQUEST":
				$result = array(
					"currentSeason" => 1,
					"leagues" => array(
						array(
							"id" => 1,
							"name" => "Serie A"
						),
						array(
							"id" => 2,
							"name" => "Serie B"
						),
						array(
							"id" => 3,
							"name" => "Lega Pro"
						)
					)
				);
			break;
			
			case "league/FETCH_REQUEST":
				$result = array(
					"name" => "Serie A",
					"standings" => array(
						array(
							"teamName" => "Juventus"
						),
						array(
							"teamName" => "Milan"
						),
						array(
							"teamName" => "Inter"
						)
					)
				);
			break;
			
			default:
				return $response
					->withStatus(401)
					->withHeader('Content-Type', 'text/html')
					->write('Unauthorized');
		}
		
		return $response->withJson($result);
		/*
		$item = R::findOne('users', 'user = ? AND pass = ?', array($data->usr, $data->pwd));
		if($item) {
			return $response->withJson(R::exportAll($item));
		} else {
			return $response
				->withStatus(401)
				->withHeader('Content-Type', 'text/html')
				->write('Unauthorized');
		}
		*/
	}
	
	public function run() {
		$this->slim->run();
	}
	
	/**
		populates the database with a set of initial data.
	*/
	public function populate() {
		// cleanup
		R::wipe('users');
		R::wipe('options');
		R::wipe('leagues');
		R::wipe('teams');
		R::wipe('players');
		
		// users
		$user = R::dispense('users');
		$user->user = "test";
		$user->pass = "test";
		R::store($user);
		
		// options
		$opt = R::dispense('options');
		$opt->option_name = "current_season";
		$opt->option_value = 1;
		R::store($opt);
		
		// leagues
		$leagues = array(
			array(
				"name" => "Serie A",
				"level" => 1
			),
			array(
				"name" => "Serie B",
				"level" => 2
			),
			array(
				"name" => "Lega Pro",
				"level" => 3
			)			
		);
		array_walk($leagues, function($l){
			$league = R::dispense('leagues');
			$league->name = $l["name"];
			$league->level = $l["level"];
			R::store($league);
		});
		
		// teams
		$teams_data = array_map('str_getcsv', file(Config\DATA_DIR . '/teams/football-italy.txt'));
		usort($teams_data, function($a, $b){
			if($a[1] > $b[1]) { return -1; }
			return 1;
		});
		array_walk($leagues, function($l, $index) use ($teams_data) {
			$slice = array_slice($teams_data, ($index * Config\TEAMS_PER_LEAGUE), Config\TEAMS_PER_LEAGUE);
			array_walk($slice, function($t) use($index) {
				$team = R::dispense('teams');
				$team->name = $t[0];
				$team->strength = $t[1];
				$team->id_league = $index + 1;
				R::store($team);
			});
		});
		
		// players
		$teams = R::findAll('teams');
		array_walk($teams, function($t){
			for($i = 0; $i < 16; $i++) {
				$this->create_player($t->id);
			}
		});
		
	}
	
	public function create_player($id_team) {
		$player = R::dispense('players');
		$player->name = $this->get_random_player_name();
		$player->surname = $this->get_random_player_surname();
		$player->id_team = $id_team;
		R::store($player);
	}
	
	private function get_random_player_name(){
		return $this->players_names[mt_rand(0, count($this->players_names) - 1)];
	}
	
	private function get_random_player_surname(){
		return $this->players_surnames[mt_rand(0, count($this->players_surnames) - 1)];
	}
}
