<?php
namespace SlimRest;

use RedBeanPHP\R as R;

class App {
	
	private $slim;
	private $db;
	
	public function __construct() {
		$this->slim = new \Slim\App(array(
			"settings" => array(
				"displayErrorDetails" => true,
			)
		));
		
		R::setup( 'mysql:host='. Config\DB_HOST .';dbname=' . Config\DB_NAME, Config\DB_USER, Config\DB_PASS );
		
		$this->setRoutes();
	}
	
	private function setRoutes() {
		this->slim->post('/auth', '\SlimRest\Models\Auth:getAuthCode');
		
		/*
		// Create
		$this->slim->post('/users', '\SlimRest\Models\Users:newItem');
		$this->slim->post('/countries', '\SlimRest\Models\Countries:newItem');
		
		// Read
		$this->slim->get('/users', '\SlimRest\Models\Users:getItems');
		$this->slim->get('/countries', '\SlimRest\Models\Countries:getItems');
		$this->slim->get('/users/{id}', '\SlimRest\Models\Users:getItem');
		$this->slim->get('/countries/{id}', '\SlimRest\Models\Countries:getItem');
		
		// Update
		$this->slim->put('/users/{id}', '\SlimRest\Models\Users:updateItem');
		$this->slim->put('/countries/{id}', '\SlimRest\Models\Countries:updateItem');
		
		// Delete
		$this->slim->delete('/users/{id}', '\SlimRest\Models\Users:deleteItem');
		$this->slim->delete('/countries/{id}', '\SlimRest\Models\Countries:deleteItem');
		*/
	}
	
	public function run() {
		$this->slim->run();
	}
	
}
