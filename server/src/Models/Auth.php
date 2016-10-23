<?php

namespace SlimRest\Models;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use RedBeanPHP\R as R;

class Auth {
	public function getAuthCode(Request $request, Response $response) {
		$data = json_decode($request->getBody());
		$item = R::findOne('users', 'usr = ? AND pwd = ?', array($data["usr"], $data["pwd"]));
		if($item) {
			return $response->withJson(R::exportAll($item));
		} else {
			return $response
				->withStatus(404)
				->withHeader('Content-Type', 'text/html')
				->write('Not found');
		}
	}
}
