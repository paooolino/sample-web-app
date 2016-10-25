<?php
	
	$CONFIG = json_decode(file_get_contents("generator.config.js"), true);
	$DYNCODE = get_dyncode($CONFIG);
	
	// index.js
	createFile("build/", "index.js", file_get_contents("templates/index.js"), array(
		"LAYOUT_IMPORTS" => $DYNCODE["LAYOUT_IMPORTS"],
		"REDUX_IMPORTS" => $DYNCODE["REDUX_IMPORTS"],
		"REDUCERS_LIST" => $DYNCODE["REDUCERS_LIST"],
		"ROUTES_TREE" => $DYNCODE["ROUTES_TREE"]
	));
	
function createFile($path, $filename, $template, $data) {
	if(!is_dir($path)) {
		mkdir($path, 0777, true);
	}

	$code = populate_template($template, $data);
	file_put_contents($path . $filename, $code);
}

function populate_template($body, $params) {
	foreach($params as $k => $v) {
		$body = str_replace("##".$k."##", $v, $body);
	}
	return $body;
}

function get_dyncode($CONFIG) {
	$result = array(
		"LAYOUT_IMPORTS" => "",
		"REDUX_IMPORTS" => "",
		"REDUCERS_LIST" => "",
		"ROUTES_TREE" => ""
	);
	
	foreach($CONFIG["layout_components"] as $l) {
		$result["LAYOUT_IMPORTS"] .= "import ". $l["name"] ." from './layout_components/". $l["name"] ."'; \r\n";
	}
	
	foreach($CONFIG["redux_modules"] as $r) {
		$result["REDUX_IMPORTS"] .= "import ". $r["name"] ."Reducer from './redux/". $r["name"] ."'; \r\n";
		$result["REDUCERS_LIST"] .= $r["name"] .": ". $r["name"] ."Reducer, \r\n";
	}

	foreach($CONFIG["routes"] as $r) {
		$result["ROUTES_TREE"] .= get_route_node($r);
	}

	return $result;
}

function get_route_node($node, $level=0) {
	$level++;
	$code = '';
	$tabs = str_repeat("\t", ($level+2));
	
	if(isset($node["children"])) {
		$code .= $tabs . '<Route path="'. $node["path"] .'" component={'. $node["component_name"] .'}>' . "\r\n";
		foreach($node["children"] as $n) {
			$code .= get_route_node($n, $level);
		}
		$code .= $tabs . '</Route>' . "\r\n";
	} else {
		if(isset($node["IndexRoute"]) && $node["IndexRoute"] == "true") {
			$code .= $tabs . '<IndexRoute component={'. $node["component_name"] .'} />' . "\r\n";
		} else {
			$code .= $tabs . '<Route path="'. $node["path"] .'" component={'. $node["component_name"] .'} />' . "\r\n";
		}
	}

	return $code;
}
