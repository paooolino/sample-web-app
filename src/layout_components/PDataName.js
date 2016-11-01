import React from 'react';
import { Link } from 'react-router';




export default (props) => (
<div>
	<div className="chat-operator">Il tuo nome e cognome</div>
	<div className="chat-user"><input /></div>
	<Link className="button" to="step-data-tel">Continua</Link>
</div>
);
