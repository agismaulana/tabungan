import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import Layout from './component/Layout';

import Login from './auth/Login';
import Logout from './auth/Logout';
import Home from './home/Home';
import Pegawai from './pegawai/Pegawai';
import Nasabah from './nasabah/Nasabah';
import User from './user/User';
import Profile from './user/Profile';
import Rekening from './rekening/Rekening';
import BukaRekening from './rekening/BukaRekening';

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
							<Route exact path="/pegawai" component={Pegawai} />
							<Route exact path="/nasabah" component={Nasabah} />
							<Route exact path="/user" component={User} />
							<Route exact path="/rekening" component={Rekening} />
							<Route exact path="/profile/" component={Profile} />
							<Route exact path="/buka-rekening/:no_rekening" component={BukaRekening} />
						</Layout>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default Routing;