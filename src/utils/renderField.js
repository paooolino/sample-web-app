import React from 'react';

const renderField = (field) => (
	<div>
		<input {...field.input} type={field.type} />
			{field.meta.touched && field.meta.error &&
				<span className="error">{field.meta.error}</span>
			}
	</div>
);

export default renderField;
