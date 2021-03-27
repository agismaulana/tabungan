import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactDatatable from '@ashvin27/react-datatable';

import TambahNasabah from './TambahNasabah';
import EditNasabah from './EditNasabah';

class Nasabah extends React.Component{

	constructor(props) {
		super(props);
		this.columns = [
			{
				key:"nm_nasabah",
				className: "nm_nasabah",
				text:"Nama Nasabah",
				sortable: true,
			},
			{
				key:"jk",
				className:"jk",
				text:"Jenis Kelamin",
				sortable: true,
			},
			{
				key:"no_hp",
				className: "no_hp",
				text:"No. Telepon",
				sortable: true,
			},
			{
				key:"email",
				className:"email",
				text:"Email",
				sortable: true,
			},
			{
				key:"alamat",
				className:"alamat",
				text:"Alamat",
				sortable: true,
			},
			{
				key:"status",
				className:"status",
				text:"Status",
				cell:(record, index) => {
					return(
						<div>
							<label className="switch">
							  <input 
							  	type="checkbox"
							  	onChange={() => {this.changeStatus(record.kd_nasabah)}}
							  	checked={record.status == "Aktif" ? "checked" : ""}/>
							  <span className="slider round"></span>
							</label>
						</div>
					)
				}
			},
			{
				key: "action",
				className:"action",
				text: "Action",
				cell: (record, index) => {
					let kd_nasabah = record.kd_nasabah
					return(
						<div className="d-flex">
							<button
								className="btn btn-success btn-sm"
								data-target="#modalEdit" data-toggle="modal"
								onClick={() => {this.editNasabah(kd_nasabah)}}
							>
								<FontAwesomeIcon icon={faEdit} /> Edit
							</button>
						</div>
					)
				}
			}
		];

		this.config = {
			page_size:5,
			length_menu: [5,10,50],
			show_filter: true,
			show_pagination: true,
		}

		this.state = {
			nasabah : [],
			dataNasabahBaru : {
				kd_nasabah: "",
				nm_nasabah: "",
				jk: "",
				no_hp: "",
				email: "",
				alamat: "",
				id_users: "",
			},
			errors: {
				nm_nasabah: "",
				jk: "",
				no_hp: "",
				email: "",
				alamat: "",
				username: "",
				password: "",
				pin: "",
			},
			dataUsersBaru: {
				id_users: "",
				username: "",
				password: "",
				level: "",
				pin: "",
			},
			errorsEdit: {
				nm_nasabah: "",
				jk: "",
				no_hp: "",
				email: "",
				alamat: "",
			},
			editNasabah : {
				kd_nasabah: "",
				nm_nasabah: "",
				jk: "",
				no_hp: "",
				email: "",
				alamat: "",
				id_users: "",
			},
			status : "",
			message : "",
		}
	}

	changeStatus = (kd_nasabah) => {
		axios.get(`http://${window.location.host}/api/change-status-nasabah/${kd_nasabah}`)
		.then((response)=>{
			this.setState({
				status: response.data.status,
				message: response.data.message,
			}, () => {this.getNasabah()})
		})
	}

	componentDidMount() {
		this.getNasabah();
	}

	getNasabah() {
		axios.get(`http://${window.location.host}/api/nasabah`)
		.then((response) => {
			if(response.status == 200) {
				this.setState({
					nasabah: response.data.data ? response.data.data: [],
				})
			}

			if(response.status == "failed") {
				this.setState({
					nasabah: response.data.message,
				})
			}
		})

		if(this.state.status != "") {
			setTimeout(() => {
				this.setState({
					status: "",
					message: "",
				})
			}, 3000)
		}
	}

	onChangeHandler = (e) => {
		let {dataNasabahBaru, dataUsersBaru, errors} = this.state;
		errors[e.target.name] = "";
		dataNasabahBaru[e.target.name] 	= e.target.value;
		dataUsersBaru[e.target.name]	= e.target.value;
		this.setState({dataNasabahBaru, dataUsersBaru, errors});
	}

	tambahNasabah = () => {

		let {dataNasabahBaru, dataUsersBaru, errors} = this.state;
		if(dataNasabahBaru.nm_nasabah == "") {
			errors.nm_nasabah = "Nama Harus Diisi";
		}

		if(dataNasabahBaru.jk == "") {
			errors.jk = "Jenis Kelamin Harus Dipilih";	
		}

		if(dataNasabahBaru.no_hp == "") {
			errors.no_hp = "No Handphone Harus Diisi";
		}

		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if(dataNasabahBaru.email == "" || reg.test(dataNasabahBaru.email) === false) {
			errors.email = "Email Tidak Valid";
		}

		if(dataUsersBaru.username == "") {
			errors.username = "Username Harus Diisi";
		}

		if(dataUsersBaru.password == "") {
			errors.password = "Password Harus Diisi";
		}

		if(dataUsersBaru.pin == "") {
			errors.pin = "Pin Harus Diisi";
		}

		if(errors.nm_nasabah || errors.jk || errors.no_hp || errors.email || errors.username || errors.password || errors.pin) {
			this.setState({errors});
		} else {
			axios.post(`http://${window.location.host}/api/tambah-nasabah`, dataNasabahBaru, dataUsersBaru)
			.then((response) => {
				this.setState({
					dataNasabahBaru: {
						kd_nasabah: "",
						nm_nasabah: "",
						jk: "",
						no_hp: "",
						email: "",
						alamat: "",
						id_users: "",
					},
					dataUsersBaru: {
						id_users: "",
						username: "",
						password: "",
						level: "",
						pin: "",
					},
					status: response.data.status,
					message: response.data.message
				}, () => this.getNasabah())
			});
		}
	}

	onChangeEditHandler = (e) => {
		let {editNasabah, errorsEdit} = this.state;
		errorsEdit[e.target.name] = "";
		editNasabah[e.target.name] = e.target.value;
		this.setState({editNasabah})
	}

	editNasabah = (kd_nasabah) => {
		axios.get(`http://${window.location.host}/api/where-nasabah/${kd_nasabah}`)
		.then((response)=>{
			this.setState({
				editNasabah: {
					kd_nasabah: response.data.data.kd_nasabah,
					nm_nasabah: response.data.data.nm_nasabah,
					jk: response.data.data.jk,
					no_hp: response.data.data.no_hp,
					email: response.data.data.email,
					alamat: response.data.data.alamat,
					id_users: response.data.data.id_users,
				},
				errorsEdit: {
					nm_nasabah: "",
					jk: "",
					no_hp: "",
					email: "",
					alamat: "",
				},
			});
		})
	} 

	updateNasabah = () => {
		let {editNasabah, errorsEdit} = this.state;

		if(editNasabah.nm_nasabah == "") {
			errorsEdit.nm_nasabah = "Nama Harus Diisi";
		}

		if(editNasabah.jk == "") {
			errorsEdit.jk = "Jenis Kelamin Harus Dipilih";	
		}

		if(editNasabah.no_hp == "") {
			errorsEdit.no_hp = "No Handphone Harus Diisi";
		}

		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if(editNasabah.email == "" || reg.test(editNasabah.email) === false) {
			errorsEdit.email = "Email Tidak Valid";
		}

		if(errorsEdit.nm_nasabah || errorsEdit.jk || errorsEdit.no_hp || errorsEdit.email) {
			this.setState({errorsEdit});
		} else {
			axios.post(`http://${window.location.host}/api/update-nasabah`, editNasabah)
			.then((response) => {
				this.setState({
					status:response.data.status,
					message:response.data.message,
				}, ()=>this.getNasabah())
			})
		}	
	}



	render() {
		const {dataNasabahBaru, dataUsersBaru, status, message, errors, errorsEdit} = this.state;

		let sendMessage = "";
		if(status == 200) {
			sendMessage = <div className="alert alert-success" role="alert">{message}</div>
		} else if(status == "failed") {
			sendMessage = <div className="alert alert-danger" role="alert">{message}</div>
		} else {
			sendMessage = "";
		}

		if(localStorage.level == "nasabah") {
			return <Redirect to="/home" />
		}

		return(
			<div>
				<div className="container mb-5">

					<div className="card bg-dark mt-2">
						<div className="card-header d-flex justify-content-between align-items-center">
							<h4>Data Nasabah</h4>
							<TambahNasabah
								tambahNasabah={this.tambahNasabah}
								onChangeHandler={this.onChangeHandler}
								dataNasabahBaru={dataNasabahBaru}
								dataUsersBaru={dataUsersBaru}
								errors={errors}
							/>

						</div>
						<EditNasabah
							editNasabah={this.state.editNasabah}
							onChangeEditHandler={this.onChangeEditHandler}
							updateNasabah={this.updateNasabah}
							errorsEdit={errorsEdit}
						/>
						<div className="card-body">
							{sendMessage}
							<div>
								<ReactDatatable
									className="table table-dark table-bordered table-responsive"
									config={this.config}
									columns={this.columns}
									records={this.state.nasabah}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Nasabah;