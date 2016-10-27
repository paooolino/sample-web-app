import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';

export default (props) => (
	<div className="container">
		{props.children}
		<Nav />
		<Header />
		<Footer />
	</div>
);
