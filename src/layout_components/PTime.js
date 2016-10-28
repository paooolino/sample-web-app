import React from 'react';
import { Link } from 'react-router';




export default (props) => (
<div>
	<Link className="button" to="step-field">Mattina</Link>
	<Link className="button" to="step-field">Pomeriggio</Link>
	<Link className="button" to="step-field">Sera</Link>
</div>
);
