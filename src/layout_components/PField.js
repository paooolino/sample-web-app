import React from 'react';
import { Link } from 'react-router';




export default (props) => (
<div>
	<div className="desc">Ecco i campi disponibili. <span className="requestedAction">Scegli dove vuoi giocare:</span></div>
	<Link className="button" to="step-confirm">Stasera 19:30 | 80€<span>Centro sportivo "Rigamonti" - campo 1</span></Link>
	<Link className="button" to="step-confirm">Domani 19:00 | 60€<span>Centro sportivo "Rigamonti" - campo 3 (coperto)</span></Link>
	<Link className="button" to="step-confirm">Domani 22:00 | 55€<span>C.S."Benedetto Pola" - campo 1</span></Link>
</div>
);
