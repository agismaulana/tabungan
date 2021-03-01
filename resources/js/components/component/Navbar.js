import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './component.css';
class Navbar extends Component {
	render() {
		return(
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container">
					<Link to="/home" className="navbar-brand">
						MyWallet
					</Link>	
				</div>
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<Link to="/profile" className="nav-link">
							<FontAwesomeIcon icon={faUser}/>
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/logout" className="nav-link">
							<FontAwesomeIcon icon={faSignOutAlt}/>
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

export default Navbar;