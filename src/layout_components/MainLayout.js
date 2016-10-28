import React from 'react';
import { Link } from 'react-router';

import Header from './Header';
import Footer from './Footer';


export default (props) => (
<div className="container">
	{props.children}
	<Header />
	<Footer />
</div>
);
