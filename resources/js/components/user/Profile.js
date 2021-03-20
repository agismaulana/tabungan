import React, {Component} from 'react';

import {
	faAddressCard,
	faUser,
	faMapMarkerAlt,
	faPhone,
	faEnvelope,
	faVenus,
	faMars,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataUsers: {
				id_users: "",
				username: "",
				password: "",
				nm_users: "",
				email: "",
				jk: "",
				alamat: "",
				no_hp: "",
				level: "",
			},
			status: "",
			message: "",
		}
	}

	componentDidMount() {
		this.getProfile();
	}

	getProfile() {
		let id_users = sessionStorage.id_users;
		if(sessionStorage.level == "Nasabah") {
			axios.get(`http://${window.location.host}/api/join-nasabah/${id_users}`)
			.then((response) => {
				this.setState({
					dataUsers: {
						id_users: response.data.data.id_users,
						username: response.data.data.username,
						nm_users: response.data.data.nm_nasabah,
						email: response.data.data.email,
						jk: response.data.data.jk,
						alamat: response.data.data.alamat,
						no_hp: response.data.data.no_hp,
						level: response.data.data.level,
					}
				})	
			})
		} else {
			axios.get(`http://${window.location.host}/api/join-pegawai/${id_users}`)
			.then((response) => {
				this.setState({
					dataUsers: {
						id_users: response.data.data.id_users,
						username: response.data.data.username,
						nm_users: response.data.data.nm_pegawai,
						email: response.data.data.email,
						jk: response.data.data.jk,
						alamat: response.data.data.alamat,
						no_hp: response.data.data.no_hp,
						level: response.data.data.level,
					}
				})	
			})
		}
	}

	render() {
		const {dataUsers} = this.state;

		let gender = "";
		if(dataUsers.jk == 'Laki-Laki') {
			gender = faMars;
		} else {
			gender = faVenus;
		}

		return(
			<div className="row justify-content-center">
				<div className="card bg-dark col-12 mb-5">
					<div className="card-body">
						<div className="d-flex justify-content-center align-items-center">
							<FontAwesomeIcon icon={faUser} className="fa-4x"/>
						</div>
						<div className="text-center">
							<h1 className="mt-2">{dataUsers.nm_users}</h1>
							<p>{dataUsers.level}</p>

							<div className="d-flex justify-content-around">
								<div>
									<FontAwesomeIcon icon={faEnvelope} className="fa-2x"/>
									<p>{dataUsers.email}</p>
								</div>
								<div>
									<FontAwesomeIcon icon={faMapMarkerAlt} className="fa-2x"/>
									<p>{dataUsers.alamat}</p>
								</div>
								<div>
									<FontAwesomeIcon icon={faPhone} className="fa-2x"/>
									<p>{dataUsers.no_hp}</p>
								</div>
								<div>
									<FontAwesomeIcon icon={gender} className="fa-2x"/>
									<p>{dataUsers.jk}</p>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-4 d-flex justify-content-center align-items-center">
								<FontAwesomeIcon icon={faAddressCard} className="fa-6x"/>
							</div>
							<div className="col-8">
								<div className="form-group">
									<label>Username</label>
									<input 
										className="form-control bg-dark text-white"
										value={dataUsers.username}
									/> 
								</div>
								<div className="form-group">
									<label>Password Lama</label>
									<input 
										type="password"
										className="form-control bg-dark text-white"
									/>
								</div>
								<div className="form-group">
									<label>Password Baru</label>
									<input 
										type="password"
										className="form-control bg-dark text-white"
									/>
								</div>
								<button
									className="btn btn-primary"
								>
									Simpan
								</button>
							</div>
						</div>
					</div>				
				</div>
			</div>
		)
	}
}

export default Profile;