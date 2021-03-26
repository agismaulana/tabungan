import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactDatatable from '@ashvin27/react-datatable';

import TambahPegawai from './TambahPegawai';
import EditPegawai from './EditPegawai';

class Pegawai extends Component {

	_isMounted = false;

	constructor(props) {
		super(props);

		this.columns = [
			{
				key:"nm_pegawai",
				className: "nm_pegawai",
				text:"Nama Pegawai",
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
							  	onChange={() => {this.changeStatus(record.kd_pegawai)}}
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
					return(
						<div className="d-flex">
							<button
								className="btn btn-success btn-sm"
								data-target="#modalEdit" data-toggle="modal"
								onClick={() => {this.editPegawai(record.kd_pegawai)}}
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
			pegawai: [],
			dataPegawaiBaru: {
				kd_pegawai: "",
				nm_pegawai: "",
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
			},
			editPegawai: {
				kd_pegawai: "",
				nm_pegawai: "",
				jk: "",
				no_hp: "",
				email: "",
				alamat: "",
				id_users: "",	
			},
			status: "",
			message: "",
		}
	}

	changeStatus = (kd_pegawai) => {
		console.log(kd_pegawai)
		axios.get(`http://${window.location.host}/api/change-status-pegawai/${kd_pegawai}`)
		.then((response)=>{
			this.setState({
				status: response.data.status,
				message: response.data.message,
			}, () => {this.getPegawai()})
		})
	}

	componentDidMount() {
		this._isMounted = true;
		if(this._isMounted){
			this.getPegawai();
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	getPegawai() {
		axios.get(`http://${window.location.host}/api/pegawai`)
		.then((response) => {
			if(response.status == 200) {
				this.setState({
					pegawai: response.data.data ? response.data.data: [],
				})
			}

			if(response.status == "failed") {
				this.setState({
					pegawai: response.data.message,
				})
			}
		})

		if(this.state.status != "") {
			setTimeout(() => {
				this.setState({
					status: "",
					message: "",
				})
			}, 1500)
		}
	}

	onChangeHandler = (e) => {
		let {dataPegawaiBaru, dataUsersBaru} = this.state;
		dataPegawaiBaru[e.target.name] = e.target.value;
		dataUsersBaru[e.target.name] = e.target.value;
		this.setState({dataPegawaiBaru, dataUsersBaru});
	} 

	tambahPegawai = (e) => {
		let {dataPegawaiBaru, dataUsersBaru} = this.state;

		axios.post(`http://${window.location.host}/api/tambah-pegawai`, dataPegawaiBaru, dataUsersBaru)
		.then((response) => {
			this.setState({
				dataPegawaiBaru: {
					kd_pegawai: "",
					nm_pegawai: "",
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
				},
				status: response.status,
				message: response.data.message,
			}, () => this.getPegawai());
		})
	}

	editPegawai = (kd_pegawai) => {
		axios.get(`http://${window.location.host}/api/where-pegawai/${kd_pegawai}`)
		.then((response) => {
			this.setState({
				editPegawai: {
					kd_pegawai: response.data.data.kd_pegawai,
					nm_pegawai: response.data.data.nm_pegawai,
					jk: response.data.data.jk,
					no_hp: response.data.data.no_hp,
					email: response.data.data.email,
					alamat: response.data.data.alamat,
					id_users: response.data.data.id_users,
				}
			})
		})
	}

	onChangeEditHandler = (e) => {
		let {editPegawai} = this.state;
		editPegawai[e.target.name] = e.target.value;
		this.setState({editPegawai});
	}

	updatePegawai = () => {
		let {editPegawai} = this.state;
		axios.post(`http://${window.location.host}/api/update-pegawai`, editPegawai)
		.then((response) => {
			this.setState({
				status: response.status,
				message: response.data.message,
			}, () => this.getPegawai());
		})
	}


	hapusPegawai = (kd_pegawai) => {
		axios.delete(`http://${window.location.host}/api/delete-pegawai/${kd_pegawai}`)
		.then((response) => {
			this.setState({
				status: response.status,
				message: response.data.message,
			}, () => this.getPegawai());
		})
	}


	render() {

		const {dataPegawaiBaru, dataUsersBaru, status, message} = this.state;

		let sendMessage = "";
		if(status == 200) {
			sendMessage = <div className="alert alert-success" role="alert">{message}</div>
		} else if(status == "failed") {
			sendMessage = <div className="alert alert-danger" role="alert">{message}</div>
		} else {
			sendMessage = "";
		}

		if(localStorage.level == "Operator" || localStorage.level == "Nasabah") {
			return <Redirect to="/home" />
		}

		return(
			<div>
				<div className="card bg-dark">
					<div className="card-header d-flex justify-content-between align-items-center">
						<h4>Data Operator</h4>
						<TambahPegawai 
							tambahPegawai={this.tambahPegawai}
							dataPegawaiBaru={dataPegawaiBaru}
							dataUsersBaru={dataUsersBaru}
							onChangeHandler={this.onChangeHandler}
						/>
					</div>

					<EditPegawai
						editPegawai={this.state.editPegawai}
						onChangeEditHandler={this.onChangeEditHandler}
						updatePegawai={this.updatePegawai}
					/>

					<div className="card-body">
						{sendMessage}
						<ReactDatatable
							className="table table-dark table-bordered"
							config={this.config}
							columns={this.columns}
							records={this.state.pegawai}
							key={this.state.pegawai.kd_pegawai}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default Pegawai;