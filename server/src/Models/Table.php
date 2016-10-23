<?php

namespace SlimRest\Models;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use RedBeanPHP\R as R;

class Table {
	protected $tablename;
	
	public function newItem(Request $request, Response $response) {
		$data = json_decode($request->getBody());
		
		$item = R::dispense($this->tablename);
		foreach($data as $k => $v) {
			$item->$k = (string)$v;
		}
		$id = R::store($item); 

    return $response->withJson(R::exportAll($item));
	}
	
	public function getItems(Request $request, Response $response) {
		$items = R::find($this->tablename); 
		return $response->withJson(R::exportAll($items));
	}
	
	public function getItem(Request $request, Response $response, $args) {
		$item = R::findOne($this->tablename, 'id=?', array($args["id"]));
		if($item) {
			return $response->withJson(R::exportAll($item));
		} else {
			return $response
				->withStatus(404)
				->withHeader('Content-Type', 'text/html')
				->write('Not found');
		}
	}
	
	public function updateItem(Request $request, Response $response, $args) {
		$data = json_decode($request->getBody());
		
		$item = R::findOne($this->tablename, 'id=?', array($args["id"]));
		
		if($item) {
			foreach($data as $k => $v) {
				$item->$k = (string)$v;
			}
			R::store($item); 

			return $response->withJson(R::exportAll($item));
		} else {
			return $response
				->withStatus(404)
				->withHeader('Content-Type', 'text/html')
				->write('Not found');
		}
	}
	
	public function deleteItem(Request $request, Response $response, $args) {
		$item = R::findOne($this->tablename, 'id=?', array($args["id"]));
		if($item) {
			R::trash($item);
			return $response->withStatus(204);
		} else {
			return $response
				->withStatus(404)
				->withHeader('Content-Type', 'text/html')
				->write('Not found');
		}
	}
	
}
