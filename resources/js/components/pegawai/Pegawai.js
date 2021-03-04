import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactDatatable from '@ashvin27/react-datatable';

import TambahPegawai from './TambahPegawai';
import EditPegawai from './EditPegawai';

class Pegawai extends Component {
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
				key: "action",
				className:"action",
				text: "Action",
				cell: (record, index) => {
					return(
						<div>
							<button
								className="btn btn-success btn-sm"
								data-target="#modalEdit" data-toggle="modal"
								onClick={() => {this.editPegawai(record.kd_pegawai)}}
							>
								<FontAwesomeIcon icon={faEdit} />
							</button>
							<button
								className="btn btn-danger btn-sm ml-2"
								onClick={() => {this.hapusPegawai(record.kd_pegawai)}}
							>
								<FontAwesomeIcon icon={faTrash} />
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

	componentDidMount() {
		this.getPegawai();
	}

	getPegawai() {
		axios.get("http://127.0.0.1:8000/api/pegawai")
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
				location.reload(true);
			}, 1500)
		}
	}

	onChangeHandler = (e) => {
		let {dataPegawaiBaru} = this.state;
		dataPegawaiBaru[e.target.name] = e.target.value;
		this.setState({dataPegawaiBaru});
	} 

	tambahPegawai = (e) => {
		let {dataPegawaiBaru} = this.state;
		
		axios.post('http://127.0.0.1:8000/api/tambah-pegawai', dataPegawaiBaru)
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
				status: response.status,
				message: response.data.message,
			}, () => this.getPegawai());
		})
	}

	editPegawai = (kd_pegawai) => {
		axios.get('http://127.0.0.1:8000/api/where-pegawai/' + kd_pegawai)
		.then((response) => {
			this.setState({
				editPegawai: {
					kd_pegawai: response.data.data[0].kd_pegawai,
					nm_pegawai: response.data.data[0].nm_pegawai,
					jk: response.data.data[0].jk,
					no_hp: response.data.data[0].no_hp,
					email: response.data.data[0].email,
					alamat: response.data.data[0].alamat,
					id_users: response.data.data[0].id_users,
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
		axios.post('http://127.0.0.1:8000/api/update-pegawai', editPegawai)
		.then((response) => {
			this.setState({
				status: response.status,
				message: response.data.message,
			}, () => this.getPegawai());
		})
	}


	hapusPegawai = (kd_pegawai) => {
		axios.delete('http://127.0.0.1:8000/api/delete-pegawai/' + kd_pegawai)
		.then((response) => {
			this.setState({
				status: response.status,
				message: response.data.message,
			}, () => this.getPegawai());
		})
	}


	render() {

		const {dataPegawaiBaru, status, message} = this.state;

		let sendMessage = "";
		if(status == 200) {
			sendMessage = <div className="alert alert-success" role="alert">{message}</div>
		} else if(status == "failed") {
			sendMessage = <div className="alert alert-danger" role="alert">{message}</div>
		} else {
			sendMessage = "";
		}

		if(sessionStorage.level == "pegawai" && sessionStorage.level == "operator") {
			return <Redirect to="/home" />
		}

		return(
			<div>
				<div className="card bg-dark mb-2">
					<div className="card-header">
						<h2>Pegawai Page</h2>
					</div>
				</div>

				<div className="card bg-dark">
					<div className="card-header d-flex justify-content-between align-items-center">
						<h4>Data Operator</h4>
						<TambahPegawai 
							tambahPegawai={this.tambahPegawai}
							dataPegawaiBaru={dataPegawaiBaru}
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
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default Pegawai;