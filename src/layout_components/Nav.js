import React from 'react';
import { Link } from 'react-router';




export default (props) => (
<ul className="nav">
	<li><Link to="/">Home</Link></li>
	<li><Link to="/login">Login</Link></li>
	<li><Link to="/register">Register</Link></li>
	<li><Link to="/lost-password">Lost Password</Link></li>
</ul>
);
