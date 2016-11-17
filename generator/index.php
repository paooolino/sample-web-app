<?php

	/*
		configuration
		
		change the config root to build another application.
	*/
	
	$OUTPUT_ROOT = "../src/";
	$CONFIG_ROOT = "config_app_sportmanagergame/";
	
	/*
		configuration end
	*/
	
	
	
	
	
	
	$CONFIG = yaml_parse_file($CONFIG_ROOT . "/generator.config.yaml");
		
	// empty folder
	if(!file_exists($OUTPUT_ROOT)) {
		mkdir($OUTPUT_ROOT);
	} else {
		emptyDir($OUTPUT_ROOT);
	}
	
	// utils
	createFile("utils/", "renderField.js", file_get_contents("templates/utils.renderFields.js"), array());
	
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
		"ROUTES_HELPERFUNCTIONS" => implode("\r\n", array_map(
			function($f) {
				$lines = array();
				array_push($lines, "const " . $f["name"] . " = (" . implode(", ", $f["inputs"]) . ") => {");
				array_push($lines, add_tabs_to_lines($f["body"], 1));
				array_push($lines, "}");
				return implode("\r\n", $lines);
			},
			$CONFIG["routes_helperfunctions"])
		),
		"ROUTES_TREE" => implode("\r\n", traverse_tree($CONFIG["routes"], 
			// callback open
			function($node){
				$tabs = str_repeat("\t", ($node["level"]+3));
				$onEnter = isset($node["onEnter"]) ? ' onEnter={'. $node["onEnter"] .'}' : '';
				if(isset($node["children"])) {
					// when has childrens, return open tag.
					return $tabs . '<Route path="'. $node["path"] .'" component={'. $node["component_name"] .'}'. $onEnter .' >';
				} else {
					// when has not children, return unary tag.
					if(isset($node["IndexRoute"]) && $node["IndexRoute"] == "true") {
						// ...in case of IndexRoute.
						return $tabs . '<IndexRoute component={'. $node["component_name"] .'}'. $onEnter .' />';
					} else {
						// ...in case of another path.
						return $tabs . '<Route path="'. $node["path"] .'" component={'. $node["component_name"] .'}'. $onEnter .' />';
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
	
	// stateless components
	foreach(array_filter($CONFIG["components"], function($c){
			return !isset($c["redux_actions"]);
		}) as $c) {
			createFile("components/", $c["name"] . ".js", file_get_contents("templates/stateless_component.js"), array(
				"HELPER_COMPONENTS" => implode("\r\n", array_map(
					function($hc){
						return "import ". $hc ." from './". $hc ."';";
					}, 
					$c["helper_components"])
				),
				"COMPONENT_HTML" => $c["html"],
				"PROPTYPES" => implode(",\r\n", array_map(
					function($p){
						return "\t" . $p["name"] . ": PropTypes." . $p["type"] . ".isRequired";
					},
					$c["props"])
				)			
			));
	}
	
	// form components
	foreach($CONFIG["forms"] as $c) {
		createFile("components/", $c["name"] . ".js", file_get_contents("templates/form_component.js"), array(
			"COMPONENT_HTML" => $c["html"],
			"VALIDATORS" => add_tabs_to_lines(implode("\r\n", array_map(
				function($v){
					return implode("\r\n", array_map(
						function($constraint) use($v) {
							return populate_template(
								file_get_contents("templates/constraint_". $constraint .".js"), array(
									"FIELD" => $v["field"],
									"ERROR_MESSAGE" => $v["error_message"]
								)
							);
						}, 
						$v["constraints"]
					));
				},
				$c["validators"]
			)), 1)
		));
	}
	
	// components
	foreach(array_filter($CONFIG["components"], function($c){
			return isset($c["redux_actions"]);
		}) as $c) {
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
				"COMPONENT_HTML" => add_tabs_to_lines($c["html"], 1),
				"PROPTYPES" => add_tabs_to_lines(implode(",\r\n", array_map(
					function($p){
						return $p["name"] . ": PropTypes." . $p["type"] . ".isRequired";
					},
					$c["props"])
				), 1),
				"DISPATCH_TO_PROPS" => add_tabs_to_lines(implode(",\r\n", array_map(
					function($p){
						return $p["name"] . ": " . rtrim($p["def"]);
					},
					array_filter($c["props"], function($p){
						if($p["type"] == "func") return true;
					}))
				), 1),
				"STATE_TO_PROPS" => add_tabs_to_lines(implode(",\r\n", array_map(
					function($p){
						return $p["name"] . ": state" . ($p["subreducer"] == "" ? "" : "." . $p["subreducer"]) . "." . $p["name"];
					},
					array_filter($c["props"], function($p){
						if($p["type"] != "func") return true;
					}))
				), 1),
				"COMPONENT_HELPERFUNCTIONS" => "",
				"COMPONENT_WILL_MOUNT" => "",
				"COMPONENT_WILL_RECEIVE_PROPS" => ""
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
			"INITIAL_STATE" => rtrim($redux["initialState"]),
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
					$html = populate_template(file_get_contents("templates/async_action.js"), array(
						"ACTION_NAME" => $a["name"],
						"ASYNC_INPUTS" => implode(", ", $a["inputs"]),
						"REQUEST_ACTION_NAME" => strtolower($a["request_action_name"]),
						"FAILURE_ACTION_NAME" => strtolower($a["failure_action_name"]),
						"SUCCESS_ACTION_NAME" => strtolower($a["success_action_name"]),
						"ON_SUCCESS" => $a["onSuccess"]
					));
					/*
					$html .= "export const ". $a["name"] ." = (". implode(", ", $a["inputs"]) .") => (dispatch) => {\r\n";
					$html .= "\t" . "dispatch(". strtolower($a["request_action"]) ."());\r\n";
					$html .= "\t" . "return fetch(ENDPOINT_HOST + ENDPOINT_PATH, {\r\n";
					$html .= "\t\t" . "method: 'POST',\r\n";
					$html .= "\t\t" . "headers: {\r\n";
					$html .= "\t\t\t" . "'Accept': 'application/json',\r\n";
					$html .= "\t\t\t" . "'Content-Type': 'application/json'\r\n";
					$html .= "\t\t" . "},\r\n";
					$html .= "\t\t" . "body: JSON.stringify({\r\n";
					$html .= implode(",\r\n", array_map(function($d){ return "\t\t\t" . $d; }, $a["inputs"])) . "\r\n";
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
					*/
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

/*
	add tabs to lines delimited by \r\n
	no tabs for the first line
*/
function add_tabs_to_lines($imploded_lines, $n_tabs) {
	// calculate tabs to append
	$tabs = str_repeat("\t", $n_tabs);
	
	// transforms isolated \n in \r\n
	$imploded_lines = str_replace("\n", "\r\n", $imploded_lines);
	$imploded_lines = str_replace("\r\r\n", "\r\n", $imploded_lines);

	// transforms isolated \r in \r\n
	$imploded_lines = str_replace("\r", "\r\n", $imploded_lines);
	$imploded_lines = str_replace("\r\n\n", "\r\n", $imploded_lines);
	
	// set tabs after each carriage return
	$html = str_replace("\r\n", "\r\n" . $tabs, $imploded_lines);
	
	// return the html without last carriage return
	return rtrim(str_replace("  ", "\t", $html));
}
