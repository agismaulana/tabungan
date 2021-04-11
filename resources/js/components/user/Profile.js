import React, {Component} from 'react';

import {
	faAddressCard,
	faUser,
	faMapMarkerAlt,
	faPhone,
	faEnvelope,
	faVenus,
	faMars,
	faSave,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import EditProfile from './EditProfile';


class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataUsers: {
				id_users: "",
				username: "",
				password_lama: "",
				password_baru: "",
				nm_users: "",
				kd_users: "",
				email: "",
				jk: "",
				alamat: "",
				no_hp: "",
				level: "",
			},
			errorsUbah: {
				password_lama: "",
				password_baru: "",
			},
			errorsEdit: {
				nm_users: "",
				email: "",
				jk: "",
				no_hp: "",
			},
			status: "",
			message: "",
		}
	}

	componentDidMount() {
		this.getProfile();
	}

	getProfile() {
		let id_users = localStorage.id_users;
		if(localStorage.level == "Nasabah") {
			axios.get(`http://${window.location.host}/api/join-nasabah/${id_users}`)
			.then((response) => {
				this.setState({
					dataUsers: {
						id_users: response.data.data.id_users,
						username: response.data.data.username,
						kd_users: response.data.data.kd_nasabah,
						nm_users: response.data.data.nm_nasabah,
						email: response.data.data.email,
						jk: response.data.data.jk,
						alamat: response.data.data.alamat,
						no_hp: response.data.data.no_hp,
						level: response.data.data.level,
						password_lama: "",
						password_baru: "",
					}
				});	
			});
		} else {
			axios.get(`http://${window.location.host}/api/join-pegawai/${id_users}`)
			.then((response) => {
				this.setState({
					dataUsers: {
						id_users: response.data.data.id_users,
						username: response.data.data.username,
						kd_users: response.data.data.kd_pegawai,
						nm_users: response.data.data.nm_pegawai,
						email: response.data.data.email,
						jk: response.data.data.jk,
						alamat: response.data.data.alamat,
						no_hp: response.data.data.no_hp,
						level: response.data.data.level,
						password_lama: "",
						password_baru: "",
					}
				})	
			})
		}

		if(this.state.status != "") {
			setTimeout(()=>{
				this.setState({
					status: "",
					message: "",
				})
			}, 3000)
		}
	}


	// Ubah Password
	onChangeUbahPassword = (e) => {
		let {dataUsers, errorsUbah} = this.state;
		errorsUbah[e.target.name] = "";
		dataUsers[e.target.name] = e.target.value;
		this.setState({dataUsers, errorsUbah});
	}

	ubahPassword = () => {

		let {dataUsers, errorsUbah} = this.state

		if(dataUsers.password_lama == "") {
			errorsUbah.password_lama = "Password harus Diisi"
		}

		if(dataUsers.password_baru == "") {
			errorsUbah.password_baru = "Password harus Diisi"
		}

		if(errorsUbah.password_lama || errorsUbah.password_baru) {
			this.setState({errorsUbah})
		} else {
			axios.post(`http://${window.location.host}/api/ubah-password`, dataUsers)
			.then((response)=>{
				this.setState({
					dataUsers: {
						password_lama: "",
						password_baru: "",
					},
					status: response.data.status,
					message: response.data.message
				}, () => this.getProfile());
			})
		}
	}

	// Edit Profile
	onChangeEditHandler = (e) => {
		let {dataUsers, errorsEdit} = this.state;
		errorsEdit[e.target.name] = "";
		dataUsers[e.target.name] = e.target.value;
		this.setState({dataUsers})
	}

	updateProfile = () => {
		let {dataUsers, errorsEdit} = this.state;

		if(dataUsers.nm_users == "") {
			errorsEdit.nm_users = "Nama Harus Diisi"
		}

		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if(dataUsers.email == "" || reg.test(dataUsers.email) === false) {
			errorsEdit.email = "Email Tidak Valid"
		}

		if(dataUsers.jk == "") {
			errorsEdit.jk = "Jenis Kelamin Harus Dipilih"
		}

		if(dataUsers.no_hp == "") {
			errorsEdit.no_hp = "No Handphone Harus Diisi"
		}

		if(errorsEdit.nm_users || errorsEdit.email || errorsEdit.jk || errorsEdit.no_hp) {
			this.setState({errorsEdit});
		} else {
			axios.post(`http://${window.location.host}/api/update-profile`, dataUsers)
			.then((response)=>{
				this.setState({
					status: response.data.status,
					message: response.data.message,
				}, () => this.getProfile())
			})
		}
	}

	render() {
		const {dataUsers, status, message, errorsUbah, errorsEdit} = this.state;

		let gender = "";
		if(dataUsers.jk == 'Laki-Laki') {
			gender = faMars;
		} else {
			gender = faVenus;
		}

		let sendMessage = "";
		if(status == 200) {
			sendMessage = <div className="alert alert-success" role="alert">{message}</div>
		} else if(status == 'failed') {
			sendMessage = <div className="alert alert-danger" role="alert">{message}</div>
		} else {
			sendMessage = "";
		}

		return(
			<div className="row justify-content-center">
				<div className="card bg-dark col-12 mb-5">
					<div className="card-body">
						{sendMessage}
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
									<p>{dataUsers.alamat != "" ? dataUsers.alamat : '-'}</p>
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
										onChange={this.onChangeUbahPassword}
									/> 
								</div>
								<div className="form-group">
									<label>Password Lama</label>
									<input 
										type="password"
										name="password_lama"
										value={dataUsers.password_lama}
										onChange={this.onChangeUbahPassword}
										className="form-control bg-dark text-white"
									/>
									<span className="text-danger">{errorsUbah.password_lama}</span>
								</div>
								<div className="form-group">
									<label>Password Baru</label>
									<input 
										type="password"
										name="password_baru"
										value={dataUsers.password_baru}
										onChange={this.onChangeUbahPassword}
										className="form-control bg-dark text-white"
									/>
									<span className="text-danger">{errorsUbah.password_baru}</span>
								</div>
								<div className="d-flex">
									<button
										className="btn btn-primary mr-1"
										onClick={()=>{this.ubahPassword()}}
									>
										<FontAwesomeIcon icon={faSave} /> Simpan
									</button>
									<EditProfile 
										updateProfile={this.updateProfile}
										dataUsers={dataUsers}
										editProfile={this.editProfile}
										onChangeEditHandler={this.onChangeEditHandler}
										errorsEdit={errorsEdit}
									/>
								</div>

							</div>
						</div>
					</div>				
				</div>
			</div>
		)
	}
}

export default Profile;