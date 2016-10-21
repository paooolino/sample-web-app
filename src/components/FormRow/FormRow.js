import React from 'react';

const getField = (type, name, change_handler, value) => {
	switch(type) {
		case "password":
			return <input onChange={change_handler} value={value} type="password" name={name} />
		
		default:
			return <input onChange={change_handler} value={value} type="text" name={name} />
	}
}

export default (props) => {
	
	const field = getField(props.type, props.name, props.change_handler, props.value);
	
	return (
		<div className="formRow">
			<div className="formLabel">
				{props.label}
			</div>
			<div className="FormField">
				{field}
			</div>
		</div>
	);
};
