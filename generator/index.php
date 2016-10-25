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
	
	// layout components
	foreach($CONFIG["layout_components"] as $c) {
		createFile("build/layout_components/", $c["name"] . ".js", file_get_contents("templates/layout_component.js"), array(
			"LAYOUT_COMPONENT_IMPORTS" => get_layout_component_imports($c),
			"COMPONENT_IMPORTS" => get_component_imports($c),
			"LAYOUT_COMPONENT_HTML" => $c["html"]
		));
	}
	
	// components
	foreach($CONFIG["components"] as $c) {
		createFile("build/components/", $c["name"] . ".js", file_get_contents("templates/component.js"), array(
			"REDUX_ACTIONS" => get_redux_actions($c),
			"HELPER_COMPONENTS" => get_helper_components($c),
			"COMPONENT_HTML" => get_component_html($c["name"])
		));
	}
	
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

function get_layout_component_imports($c) {
	$html = "";
	
	if(isset($c["imports"])) {
		foreach($c["imports"] as $import) {
			$html .= "import ". $import ." from './". $import ."';\r\n";
		}
	}
	
	return $html;
}

function get_component_imports($c) {
	$html = "";
	
	if(isset($c["import_component"])) {
		foreach($c["import_component"] as $import) {
			$html .= "import ". $import ." from '../components/". $import ."';\r\n";
		}
	}
	
	return $html;
}

function get_redux_actions($c) {
	$html = "";
	
	if(isset($c["redux_actions"])) {
		foreach($c["redux_actions"] as $redux) {
			$html .= "import * as actions_". $redux ." from '../redux/". $redux ."';\r\n";
		}
	}
	
	return $html;
}

function get_helper_components($c) {
	$html = "";
	
	if(isset($c["helper_components"])) {
		foreach($c["helper_components"] as $hc) {
			$html .= "import ". $hc ." from './". $hc ."';\r\n";
		}
	}
	
	return $html;
}

function get_component_html($name) {
	$html = file_get_contents("config_html/components/" . $name . ".html");
	return $html === FALSE ? "" : $html;
}
