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

	constructor(props) {
		super(props);
	}

	render() {
		if(sessionStorage.length > 0) {
			if(sessionStorage.level == "administrator") {
				return(
					<div className="sidebar">
						<ul className="sidebar-menu">
							<span className="sidebar-title">Home</span>
							<li className={window.location.pathname == "/home" ? 'sidebar-item active' : 'sidebar-item'}>
								<Link to="/home" className="sidebar-link">
									<FontAwesomeIcon icon={faHome} /> Home
								</Link>
							</li>
							<span className="sidebar-title">Management</span>
							<li className={window.location.pathname == "/pegawai" ? 'sidebar-item active' : 'sidebar-item'}>
								<Link to="/pegawai" className="sidebar-link">
									<FontAwesomeIcon icon={faUserTie} /> Pegawai
								</Link>
							</li>
							<li className={window.location.pathname == "/nasabah" ? 'sidebar-item active' : 'sidebar-item'}>
								<Link to="/nasabah" className="sidebar-link">
									<FontAwesomeIcon icon={faFileInvoice} /> Nasabah
								</Link>
							</li>
							<li className={window.location.pathname == "/users" ? 'sidebar-item active' : 'sidebar-item'}>
								<Link to="/users" className="sidebar-link">
									<FontAwesomeIcon icon={faUsers} /> Users
								</Link>
							</li>
							<span className="sidebar-title">Entri</span>
							<li className={window.location.pathname == "/rekening" ? 'sidebar-item active' : 'sidebar-item'}>
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