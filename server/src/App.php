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
	}
	
	/**
	 *	Set the unique route for the endpoint App.
	 */	
	private function setRoutes() {
		$this->slim->post('/', array($this, 'route'));
	}
	
	public function route(Request $request, Response $response) {
		$data = json_decode($request->getBody());
		
		switch($data->action) {
			case "season/FETCH_REQUEST":
				$result = array("currentSeason" => 1);
			break;
			
			default:
				$result = "Unauthorized";
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
	
}
