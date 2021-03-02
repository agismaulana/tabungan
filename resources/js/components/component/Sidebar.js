import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {
	faHome,
	faFileInvoice,
	faUsers,
	faUserTie,
	faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Sidebar extends Component {

	compoentDidMount () { 
		console.log('oke');
	}

	render() {
		if(sessionStorage.length > 0) {
			if(sessionStorage.level == "admin") {
				return(
					<div className="sidebar">
						<ul className="sidebar-menu">
							<span className="sidebar-title">Home</span>
							<li className="sidebar-item active">
								<Link to="/home" className="sidebar-link">
									<FontAwesomeIcon icon={faHome} /> Home
								</Link>
							</li>
							<span className="sidebar-title">Management</span>
							<li className="sidebar-item">
								<Link to="/operator" className="sidebar-link">
									<FontAwesomeIcon icon={faUserTie} /> Operator
								</Link>
							</li>
							<li className="sidebar-item">
								<Link to="/nasabah" className="sidebar-link">
									<FontAwesomeIcon icon={faFileInvoice} /> Nasabah
								</Link>
							</li>
							<li className="sidebar-item">
								<Link to="/users" className="sidebar-link">
									<FontAwesomeIcon icon={faUsers} /> Users
								</Link>
							</li>
							<span className="sidebar-title">Entri</span>
							<li className="sidebar-item">
								<Link to="/rekening" className="sidebar-link">
									<FontAwesomeIcon icon={faCreditCard} /> Rekening
								</Link>
							</li>
						</ul>
					</div>
				)
			} else if(sessionStorage.level == "operator") {
				return(
					<div className="sidebar">
						<ul className="sidebar-menu">
							<span className="sidebar-title">Home</span>
							<li className="sidebar-item active">
								<Link to="/home" className="sidebar-link">
									<FontAwesomeIcon icon={faHome} /> Home
								</Link>
							</li>
							<span className="sidebar-title">Management</span>
							<li className="sidebar-item">
								<Link to="/nasabah" className="sidebar-link">
									<FontAwesomeIcon icon={faFileInvoice} /> Nasabah
								</Link>
							</li>
							<li className="sidebar-item">
								<Link to="/users" className="sidebar-link">
									<FontAwesomeIcon icon={faUsers} /> Users
								</Link>
							</li>
							<span className="sidebar-title">Entri</span>
							<li className="sidebar-item">
								<Link to="/rekening" className="sidebar-link">
									<FontAwesomeIcon icon={faCreditCard} /> Rekening
								</Link>
							</li>
						</ul>
					</div>
				)
			} else {
				return(
					<div className="sidebar">
						<ul className="sidebar-menu">
							<span className="sidebar-title">Home</span>
							<li className="sidebar-item active">
								<Link to="/home" className="sidebar-link">
									<FontAwesomeIcon icon={faHome} /> Home
								</Link>
							</li>
							<span className="sidebar-title">Entri</span>
							<li className="sidebar-item">
								<Link to="/rekening" className="sidebar-link">
									<FontAwesomeIcon icon={faCreditCard} /> Rekening
								</Link>
							</li>
						</ul>
					</div>
				)
			}
		} else {
			return <Redirect to="/logout"/>
		}
	}

}

export default Sidebar;