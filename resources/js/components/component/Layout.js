import React, {Component} from 'react';

import {Redirect} from 'react-router-dom';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

import './component.css';

class Layout extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		}
	}

	componentDidMount() {
		if(sessionStorage.length == 0 && sessionStorage.level == "") {
			this.setState({
				redirect: true,
			})
		}
	}

	render() {
		if(sessionStorage.length == 0) {
			if(this.state.redirect) {
				return <Redirect to="/logout"/>
			}
		}

		return(
			<div>
				<Navbar />
				<Sidebar />
				<div className="wrapper">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Layout;