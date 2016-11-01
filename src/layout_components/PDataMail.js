import React from 'react';
import { Link } from 'react-router';




export default (props) => (
<div>
	<div className="desc_label">Hai scelto di giocare</div>
	<div className="desc_value">
		Domani, ore 19:00<br />
		Centro Sportivo "Rigamonti" - campo 1<br />
		#nome# #cognome#<br />
		#tel#
	</div>
	<div className="desc">Lasciaci un tuo indirizzo e-mail:</div>
	<div className="userinput"><input /></div>
	<Link className="button" to="step-finish">Continua</Link>
</div>
);
