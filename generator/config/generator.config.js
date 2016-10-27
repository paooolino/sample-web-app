{
	"routes": [{
		"component_name": "MainLayout",
		"path": "/",
		"children": [{
			"component_name": "PHome",
			"IndexRoute": "true"
		}, {
			"component_name": "PLogin",
			"path": "/login"
		}, {
			"component_name": "PRegister",
			"path": "/register"
		}, {
			"component_name": "PLostPassword",
			"path": "/lost-password"
		}]
	}],
	"layout_components": [{
		"name": "MainLayout",
		"imports": ["Header", "Footer", "Nav"],
		"import_component": [],
		"html": ""
	}, {
		"name": "Header",
		"imports": [],
		"import_component": [],
		"html": "<div>Header</div>"
	}, {
		"name": "Footer",
		"imports": [],
		"import_component": [],
		"html": "<div>Footer</div>"
	}, {
		"name": "Nav",
		"imports": [],
		"import_component": [],
		"html": "<div>Nav</div>"
	}, {
		"name": "PHome",
		"imports": [],
		"import_component": [],
		"html": "<div>PHome</div>"
	}, {
		"name": "PLogin",
		"imports": [],
		"import_component": ["LoginForm"],
		"html": "<div><LoginForm /></div>"
	}],
	"redux_modules": [{
		"name": "login",
		"async_actions": [{
			"name": "submit",
			"request_action": "REQUEST",
			"data_to_pass": ["usr", "pwd"],
			"success": "function() {}",
			"failure": "function() {}"
		}],
		"actions": [{
			"name": "REQUEST",
			"inputs": [],
			"effects": [{
				"key": "isRequesting",
				"newValue": "true"
			}]
		}, {
			"name": "REQUEST_FAILURE",
			"inputs": ["error_message"],
			"effects": [{
				"key": "isRequesting",
				"newValue": "false"
			}, {
				"key": "error_message",
				"newValue": "action.error_message"
			}]
		}, {
			"name": "REQUEST_SUCCESS",
			"inputs": [],
			"effects": []
		}],
		"initialState": [{
			"name": "usr",
			"jsvalue": "''"
		},{
			"name": "pwd",
			"jsvalue": "''"
		},{
			"name": "isRequesting",
			"jsvalue": "false"
		},{
			"name": "error_message",
			"jsvalue": "''"
		}]
	}],
	"components": [{
		"name": "LoginForm",
		"redux_actions": ["login"],
		"helper_components": ["FormRow"],
		"props": [{
			"name": "usr",
			"subreducer": "login",
			"type": "string"
		}, {
			"name": "pwd",
			"subreducer": "login",
			"type": "string"
		}, {
			"name": "isRequesting",
			"subreducer": "login",
			"type": "bool"
		}, {
			"name": "error_message",
			"subreducer": "login",
			"type": "string"
		}, {
			"name": "submit_handler",
			"type": "func",
			"func_def": "function() {}"
		}, {
			"name": "change_handler",
			"type": "func",
			"func_def": "function() {}"
		}]
	}]
}