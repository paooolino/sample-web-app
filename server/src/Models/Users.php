<?php

namespace SlimRest\Models;

class Users extends \SlimRest\Models\Table {
	public function __construct() {
		$this->tablename = "users";
	}
}
