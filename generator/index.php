<?php

	$OUTPUT_ROOT = "../src/";
	$CONFIG = yaml_parse_file("config/generator.config.yaml");
	
	// index.js
	createFile("", "index.js", file_get_contents("templates/index.js"), array(
		"LAYOUT_IMPORTS" => implode("\r\n", array_map(
			function($layout){
				return "import ". $layout["name"] ." from './layout_components/". $layout["name"] ."';";
			}, 
			$CONFIG["layout_components"])
		),
		"REDUX_IMPORTS" => implode("\r\n", array_map(
			function($module){
				return "import ". $module["name"] ."Reducer from './redux/". $module["name"] ."';";
			}, 
			$CONFIG["redux_modules"])
		),
		"REDUCERS_LIST" => implode("\r\n", array_map(
			function($module){
				return $module["name"] . ": " . $module["name"] ."Reducer,";
			}, 
			$CONFIG["redux_modules"])
		),
		"ROUTES_TREE" => implode("\r\n", array_map(
			function($r){
				return get_route_node($r);
			}, 
			$CONFIG["routes"])
		)
	));
	
	// layout components
	foreach($CONFIG["layout_components"] as $c) {
		createFile("layout_components/", $c["name"] . ".js", file_get_contents("templates/layout_component.js"), array(
			"LAYOUT_COMPONENT_IMPORTS" => implode("\r\n", array_map(
				function($import){
					return "import ". $import ." from './". $import ."';";
				}, 
				$c["imports"])
			),
			"COMPONENT_IMPORTS" => implode("\r\n", array_map(
				function($import){
					return "import ". $import ." from '../components/". $import ."';";
				}, 
				$c["import_component"])
			),
			"LAYOUT_COMPONENT_HTML" => get_component_html("", $c["name"])
		));
	}
	
	// components
	foreach($CONFIG["components"] as $c) {
		createFile("components/", $c["name"] . ".js", file_get_contents("templates/component.js"), array(
			"REDUX_ACTIONS" => implode("\r\n", array_map(
				function($redux){
					return "import * as actions_". $redux ." from '../redux/". $redux ."';";
				}, 
				$c["redux_actions"])
			),
			"HELPER_COMPONENTS" => implode("\r\n", array_map(
				function($hc){
					return "import ". $hc ." from './". $hc ."';";
				}, 
				$c["helper_components"])
			),
			"COMPONENT_HTML" => get_component_html("components/" . $c["name"] . "/", $c["name"]),
			"PROPTYPES" => implode(",\r\n", array_map(
				function($p){
					return "\t" . $p["name"] . ": PropTypes." . $p["type"] . ".isRequired";
				},
				$c["props"])
			),
			"DISPATCH_TO_PROPS" => implode(",\r\n", array_map(
				function($p){
					GLOBAL $c;
					return get_handler("components/" . $c["name"] . "/", $p["name"]);
				},
				array_filter($c["props"], function($p){
					if($p["type"] == "func") return true;
				}))
			),
			"STATE_TO_PROPS" => implode(",\r\n", array_map(
				function($p){
					return "\t" . $p["name"] . ": state" . ($p["subreducer"] == "" ? "" : "." . $p["subreducer"]) . "." . $p["name"];
				},
				array_filter($c["props"], function($p){
					if($p["type"] != "func") return true;
				}))
			)
		));
	}
	
	// redux
	foreach($CONFIG["redux_modules"] as $redux) {
		createFile("redux/", $redux["name"] . ".js", file_get_contents("templates/redux.js"), array(
			"ACTION_CONSTANTS" => implode("\r\n", array_map(
				function($a){
					GLOBAL $redux;
					return "const ". $a["name"] ." = '". $redux["name"] ."/". $a["name"] ."';";
				},
				$redux["actions"])
			),
			"INITIAL_STATE" => implode(",\r\n", array_map(
				function($s){
					return "\t" . $s["name"] . ": ". $s["jsvalue"];
				},
				$redux["initialState"])
			),
			"REDUCER_ACTIONS" => implode("\r\n", array_map(
				function($a){
					$html = '';
					$html .= "\t\t" . "case " . $a["name"] . ":\r\n";
					$html .= "\t\t\t" . "return Object.assign({}, state, {\r\n";
					$html .= implode(",\r\n", array_map(
						function($eff){
							return "\t\t\t\t" . $eff["key"] . ": " . $eff["newValue"];
						},
						$a["effects"]
					));
					$html .= "\r\n\t\t\t" . "})\r\n";
					return $html;
				},
				$redux["actions"])
			),
			"ASYNC_ACTIONS" => implode("\r\n\r\n", array_map(
				function($a){
					$html = "";
					
					$html .= "export const ". $a["name"] ." = (". implode(", ", $a["data_to_pass"]) .") => (dispatch) => {\r\n";
					$html .= "\t" . "dispatch(". strtolower($a["request_action"]) ."());\r\n";
					$html .= "\t" . "return fetch(ENDPOINT_HOST + ENDPOINT_PATH, {\r\n";
					$html .= "\t\t" . "method: 'POST',\r\n";
					$html .= "\t\t" . "headers: {\r\n";
					$html .= "\t\t\t" . "'Accept': 'application/json',\r\n";
					$html .= "\t\t\t" . "'Content-Type': 'application/json'\r\n";
					$html .= "\t\t" . "},\r\n";
					$html .= "\t\t" . "body: JSON.stringify({\r\n";
					$html .= implode(",\r\n", array_map(function($d){ return "\t\t\t" . $d; }, $a["data_to_pass"])) . "\r\n";
					$html .= "\t\t" . "})\r\n";
					$html .= "\t" . "})\r\n";
					$html .= "\t\t" . ".then(response => {" . "\r\n";
					$html .= "\t\t\t" . "if(!response.ok) {" . "\r\n";
					$html .= "\t\t\t\t" . "dispatch(request_failure(response.status + ' - ' + response.statusText))" . "\r\n";
					$html .= "\t\t\t" . "} else {" . "\r\n";
					$html .= "\t\t\t\t" . "// request_success" . "\r\n";
					$html .= "\t\t\t" . "}" . "\r\n";
					$html .= "\t\t" . "})" . "\r\n";
					$html .= "\t\t" . ".catch(err => {" . "\r\n";
					$html .= "\t\t\t" . "dispatch(request_failure(err.message))" . "\r\n";
					$html .= "\t\t" . "});" . "\r\n";
					$html .= "}". "\r\n";
					
					return $html;
				},
				$redux["async_actions"]
			)),
			"SYNC_ACTIONS" => implode("\r\n\r\n", array_map(
				function($a){
					$html = "";
					
					$html .= "export const ". strtolower($a["name"]) ." = (". implode(", ", $a["inputs"]) .") => ({\r\n";
					$html .= implode(",\r\n", array_map(function($d){ return "\t" . $d; }, array_merge(
						array( "type: " . $a["name"]),
						$a["inputs"]
					))) . "\r\n";
					$html .= "})". "\r\n";
					
					return $html;
				},
				$redux["actions"]
			))
		));
	}
	
function createFile($path, $filename, $template, $data) {
	GLOBAL $OUTPUT_ROOT;
	$path = $OUTPUT_ROOT . $path;
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

function get_component_html($path, $name) {
	$html = file_get_contents("config/" . $path . $name . ".html");
	if( $html === FALSE ) {
		mylog("I was looking for the <b>" . "config/" . $path . $name . ".html" . "</b> file, but none found.");
	}
	return $html === FALSE ? "" : $html;
}

function get_handler($path, $name) {
	$js = file_get_contents("config/" . $path . $name . ".js");
	if( $js === FALSE ) {
		mylog("I was looking for the <b>" . "config/" . $path . $name . ".js" . "</b> file, but none found.");
	}
	return $js === FALSE ? "" : $js;
}

function mylog($s) {
	echo "<p>" . $s . "</p>";
}