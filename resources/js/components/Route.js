import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import Layout from './component/Layout';

import Login from './auth/Login';
import Logout from './auth/Logout';
import Home from './home/Home';
import Nasabah from './nasabah/Nasabah';

class Routing extends Component {
	render() {
		return(
			<div>
				<Router>
					<Switch>
						<Route exact path="/">
							<Login />
						</Route>
						<Route path="/logout">
							<Logout/>
						</Route>
						<Layout>
							<Route exact path="/home" component={Home} />
							<Route exact path="/nasabah" component={Nasabah}/>
						</Layout>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default Routing;