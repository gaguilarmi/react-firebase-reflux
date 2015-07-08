import React from 'react'
import Router from 'react-router';
import routes from './routers/router';
import Main from './components/Main';

// React.render(<Main/>, document.getElementById('container'));
//
Router.run(routes, (Root, state) => {
	React.render(<Root {...state}/>, document.getElementById('content'))
} );


// http://javascript.tutorialhorizon.com/2014/09/13/execution-sequence-of-a-react-components-lifecycle-methods/
