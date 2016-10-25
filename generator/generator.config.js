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
		"html": ""
	}, {
		"name": "Header",
		"html": "<div>Header</div>"
	}, {
		"name": "Footer",
		"html": "<div>Footer</div>"
	}, {
		"name": "Nav",
		"html": "<div>Nav</div>"
	}, {
		"name": "PHome",
		"html": "<div>PHome</div>"
	}, {
		"name": "PLogin",
		"import_component": ["LoginForm"],
		"html": "<div><LoginForm /></div>"
	}],
	"redux_modules": [{
		"name": "login",
		"async_actions": [{
			"name": "submit",
			"data_to_pass": ["usr", "pwd"],
			"success": "function() {}",
			"failure": "function() {}"
		}],
		"actions": [{
			"name": "REQUEST",
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
			"name": "REQUEST_SUCCESS"
		}],
		"initialState": {
			"usr": "",
			"pwd": "",
			"isRequesting": "false",
			"error_message": ""
		}
	}],
	"components": [{
		"name": "LoginForm",
		"redux_actions": ["login"],
		"helper_components": ["FormRow"],
		"props": [{
			"name": "usr",
			"type": "string"
		}, {
			"name": "pwd",
			"type": "string"
		}, {
			"name": "isRequesting",
			"type": "bool"
		}, {
			"name": "error_message",
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