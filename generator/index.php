<?php

	/*
		configuration
		
		change the config root to build another application.
	*/
	
	$OUTPUT_ROOT = "../src/";
	$CONFIG_ROOT = "config_app_fields_2/";
	
	/*
		configuration end
	*/
	
	
	
	
	
	
	$CONFIG = yaml_parse_file($CONFIG_ROOT . "/generator.config.yaml");
		
	// empty folder
	emptyDir($OUTPUT_ROOT);
	
	// index.js
	createFile("", "index.js", file_get_contents("templates/index.js"), array(
		"LAYOUT_IMPORTS" => implode("\r\n", traverse_tree($CONFIG["routes"],
			function($node) {
				return "import ". $node["component_name"] ." from './components/". $node["component_name"] ."';";
			},
			function($node) {}
		)),
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
		"ROUTES_TREE" => implode("\r\n", traverse_tree($CONFIG["routes"], 
			// callback open
			function($node){
				$tabs = str_repeat("\t", ($node["level"]+3));
				if(isset($node["children"])) {
					// when has childrens, return open tag.
					return $tabs . '<Route path="'. $node["path"] .'" component={'. $node["component_name"] .'}>';
				} else {
					// when has not children, return unary tag.
					if(isset($node["IndexRoute"]) && $node["IndexRoute"] == "true") {
						// ...in case of IndexRoute.
						return $tabs . '<IndexRoute component={'. $node["component_name"] .'} />';
					} else {
						// ...in case of another path.
						return $tabs . '<Route path="'. $node["path"] .'" component={'. $node["component_name"] .'} />';
					}
				}
			}, 
			// callback close
			function($node){
				$tabs = str_repeat("\t", ($node["level"]+3));
				if(isset($node["children"])) {
					// close tag only if node had children.
					return $tabs . '</Route>';
				}
			}
		))
	));
	
	// layout components
	/*
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
	*/
	
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

function traverse_tree($arr, $cb_open, $cb_close, $level=0, &$result=[]) {
	foreach($arr as $node) {
		$node["level"] = $level;
		array_push($result, $cb_open($node));
		if(isset($node["children"])) {
			traverse_tree($node["children"], $cb_open, $cb_close, $level+1, $result);
		}
		array_push($result, $cb_close($node));
	}
	return array_values(array_filter($result));
}

function get_component_html($path, $name) {
	GLOBAL $CONFIG_ROOT;
	
	$html = file_get_contents($CONFIG_ROOT . $path . $name . ".html");
	if( $html === FALSE ) {
		mylog("I was looking for the <b>" . $CONFIG_ROOT . $path . $name . ".html" . "</b> file, but none found.");
	}
	return $html === FALSE ? "" : $html;
}

function get_handler($path, $name) {
	GLOBAL $CONFIG_ROOT;
	
	$js = file_get_contents($CONFIG_ROOT . $path . $name . ".js");
	if( $js === FALSE ) {
		mylog("I was looking for the <b>" . $CONFIG_ROOT . $path . $name . ".js" . "</b> file, but none found.");
	}
	return $js === FALSE ? "" : $js;
}

function mylog($s) {
	echo "<p>" . $s . "</p>";
}

function emptyDir($dirPath) {
	if (!is_dir($dirPath)) {
		die("$dirPath must be a directory");
	}
	if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
		$dirPath .= '/';
	}
	$files = glob($dirPath . '*', GLOB_MARK);
	foreach ($files as $file) {
		if (is_dir($file)) {
			emptyDir($file);
		} else {
			unlink($file);
		}
	}
}