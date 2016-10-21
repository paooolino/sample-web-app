import React from 'react';
import FormRow from '../FormRow/FormRow';

export default (props) => (
	<div>
		<form onSubmit={(evt)=>{evt.preventDefault();}}>
			<FormRow name="usr" label="username" change_handler={()=>{}} value="" />
			<FormRow name="pwd" type="password" label="password" change_handler={()=>{}} value="" />
			<div>
				<button>Log in</button>
			</div>
		</form>
	</div>
);