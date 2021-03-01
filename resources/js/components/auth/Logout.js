import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends Component {

	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		}
	}

	componentDidMount() {
		sessionStorage.clear();
		this.setState({
			redirect: true,
		})
	}

	render() {
		if(sessionStorage.length == 0) {
			if(this.state.redirect) {
				return <Redirect to="/"/>
			}
		}
		return(<div></div>);
	}
}

export default Logout