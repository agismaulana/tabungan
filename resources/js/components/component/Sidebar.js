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
		this.state = {
			kd_nasabah: "",
			no_rekening: "",
		}
	}

	componentDidMount() {
		if(sessionStorage.level == "Nasabah") {
			this.getNasabah(sessionStorage.id_users)
		}
	}

	getNasabah(id_users) {
		axios.get(`http://${window.location.host}/api/join-nasabah/${id_users}`)
		.then((response) => {
			this.setState({
				kd_nasabah: response.data.data.kd_nasabah,
				no_rekening: response.data.data.no_rekening,
			})
		})
	}

	render() {

		const {no_rekening} = this.state;
		const url = window.location.pathname.split('/');

		if(sessionStorage.length > 0) {
			if(sessionStorage.level == "Administrator") {
				return(
					<div className="sidebar">
						<ul className="sidebar-menu">
							<span className="sidebar-title">Home</span>
							<li className={window.location.pathname == "/home" ? 'sidebar-item active' : 'sidebar-item'}>
								<Link to="/home" className="sidebar-link">
									<div className="icon">
										<div className="sidebar-icon-box">
											<FontAwesomeIcon icon={faHome}/>
										</div>
										<span>Home</span>
									</div>
								</Link>
							</li>
							<span className="sidebar-title">Management</span>
							<li className={window.location.pathname == "/pegawai" ? 'sidebar-item active' : 'sidebar-item'}>
								<Link to="/pegawai" className="sidebar-link">
									<div className="icon">
										<div className="sidebar-icon-box">
											<FontAwesomeIcon icon={faUserTie}/>
										</div>
										<span>Pegawai</span>
									</div>
								</Link>
							</li>
							<li className={window.location.pathname == "/nasabah" ? 'sidebar-item active' : 'sidebar-item'}>
								<Link to="/nasabah" className="sidebar-link">
									<div className="icon"> 
										<div className="sidebar-icon-box">
											<FontAwesomeIcon icon={faFileInvoice}/> 
										</div>
										<span>Nasabah</span>
									</div>
								</Link>
							</li>
							<span className="sidebar-title">Entri</span>
							<li 
								className=
									{window.location.pathname == "/rekening" || 
									 url[1] == "buka-rekening" 
									 ? 'sidebar-item active' 
									 : 'sidebar-item'
									}>
								<Link to="/rekening" className="sidebar-link">
									<div className="icon">
										<div className="sidebar-icon-box">
											<FontAwesomeIcon icon={faCreditCard}/> 
										</div>
										<span>Rekening</span>
									</div>
								</Link>
							</li>
						</ul>
					</div>
				)
			} else if(sessionStorage.level == "Operator") {
				return(
					<div className="sidebar">
						<ul className="sidebar-menu">
							<span className="sidebar-title">Home</span>
							<li className="sidebar-item active">
								<Link to="/home" className="sidebar-link">
									<div className="icon">
										<div className="sidebar-icon-box">
											<FontAwesomeIcon icon={faHome}/> 
										</div>
										<span>Home</span>
									</div>
								</Link>
							</li>
							<span className="sidebar-title">Management</span>
							<li className="sidebar-item">
								<Link to="/nasabah" className="sidebar-link">
									<div className="icon">
										<div className="sidebar-icon-box">
											<FontAwesomeIcon icon={faFileInvoice}/> 
										</div>
										<span>Nasabah</span>
									</div>
								</Link>
							</li>
							<span className="sidebar-title">Entri</span>
							<li className="sidebar-item">
								<Link to="/rekening" className="sidebar-link">
									<div className="icon">
										<div className="sidebar-icon-box">
											<FontAwesomeIcon icon={faCreditCard}/> 
										</div>
										<span>Rekening</span>
									</div>
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
									<div className="icon">
										<div className="sidebar-icon-box">
											<FontAwesomeIcon icon={faHome}/> 
										</div>
										<span>Home</span>
									</div>
								</Link>
							</li>
							<span className="sidebar-title">Entri</span>
							<li className="sidebar-item">
								<Link to={'/buka-rekening/'+no_rekening} className="sidebar-link">
									<div className="icon">
										<div className="sidebar-icon-box">
											<FontAwesomeIcon icon={faCreditCard}/> 
										</div>
										<span>Rekening</span>
									</div>
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