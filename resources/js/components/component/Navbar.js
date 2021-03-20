import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './component.css';

import img from '../../image/ilustrasi/logo.svg';

class Navbar extends Component {

	render() {
		return(
			<div>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<div className="container">
						<Link to="/home" className="navbar-brand">
							<img src={img} alt="logo" className="logo-image"/> MyDeposits
						</Link>	
					</div>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link to="/profile" className="nav-link">
								<FontAwesomeIcon icon={faUser}/>
							</Link>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link" data-target="#modalLogout" data-toggle="modal">
								<FontAwesomeIcon icon={faSignOutAlt} className="fa-1x"/>
							</a>
						</li>
					</ul>
				</nav>
				<div className="modal fade" id="modalLogout" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  	<div className="modal-dialog">
				    	<div className="modal-content bg-dark">
				      		<div className="modal-header">
				        		<h5 className="modal-title font-weigth-bold text-white" id="exampleModalLabel">Modal Log Out</h5>
				      		</div>
				      		<div className="modal-body">
				      			<h4 className="text-white">Apakah Anda Yakin Log Out!!!!</h4>
				      		</div>
				      		<div className="modal-footer">
				        		<button 
				        			type="button" 
				        			className="btn btn-danger" 
				        			data-dismiss="modal"
				        		>
				        			Close
				        		</button>
				        		<a 
				        			href="/logout"
				        			className="btn btn-success"
				        		>
				        			Log Out
				        		</a>
				      		</div>
				    	</div>
				  	</div>
				</div>
			</div>
		)
	}
}

export default Navbar;