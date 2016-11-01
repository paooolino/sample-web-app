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
		#mail#
	</div>
	<div className="desc">Ok! Grazie per aver prenotato.</div>
	<Link className="button" to="/">Torna all'inizio</Link>
</div>
);
