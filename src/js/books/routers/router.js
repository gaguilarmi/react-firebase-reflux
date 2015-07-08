// import { history } from 'react-router/lib/HashHistory';
import React from 'react';
import { Router, Route, DefaultRoute } from 'react-router';
import Main from '../components/Main'
import FilterableTable from '../components/FilterableTable';

let routes = (
	<Route name='app' path='/' handler={Main}>
		<DefaultRoute handler={FilterableTable}/>
    <Route path="inbox" name='inbox' handler={FilterableTable}/>
    <Route path="inbox/:filterType" name='inbox-filtered' handler={FilterableTable}/>
  </Route>
);

export default routes;