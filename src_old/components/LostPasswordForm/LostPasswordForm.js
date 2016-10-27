import React from 'react';
import FormRow from '../FormRow/FormRow';

export default (props) => (
	<div>
		<form onSubmit={(evt)=>{evt.preventDefault();}}>
			<FormRow name="email" label="Your email" change_handler={()=>{}} value="" />
			<div>
				<button>Reset password</button>
			</div>
		</form>
	</div>
);