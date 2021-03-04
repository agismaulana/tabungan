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
				key: "action",
				className:"action",
				text: "Action",
				cell: (record, index) => {
					return(
						<div>
							<button
								className="btn btn-success btn-sm"
								data-target="#modalEdit" data-toggle="modal"
								onClick={() => {this.editNasabah(record.kd_nasabah)}}
							>
								<FontAwesomeIcon icon={faEdit} />
							</button>
							<button
								className="btn btn-danger btn-sm ml-2"
								onClick={() => {this.hapusNasabah(record.kd_nasabah)}}
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

	componentDidMount() {
		this.getNasabah();
	}

	getNasabah() {
		axios.get("http://127.0.0.1:8000/api/nasabah")
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
				location.reload(true);
			}, 1500)
		}
	}

	onChangeHandler = (e) => {
		let {dataNasabahBaru} = this.state;
		dataNasabahBaru[e.target.name] = e.target.value;
		this.setState({dataNasabahBaru});
	}

	tambahNasabah = () => {
		let {dataNasabahBaru} = this.state;

		axios.post("http://127.0.0.1:8000/api/tambah-nasabah", this.state.dataNasabahBaru)
		.then((response) => {
			const {nasabah} = this.state;
			const nasabahBaru = [...nasabah];
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
				status: response.status,
				message: response.data.message
			}, () => this.getNasabah())
		},);
	}

	onChangeEditHandler = (e) => {
		let {editNasabah} = this.state;
		editNasabah[e.target.name] = e.target.value;
		this.setState({editNasabah})
	}

	editNasabah = (kd_nasabah) => {
		axios.get('http://127.0.0.1:8000/api/where-nasabah/' + kd_nasabah)
		.then((response)=>{
			this.setState({
				editNasabah: {
					kd_nasabah: response.data.data[0].kd_nasabah,
					nm_nasabah: response.data.data[0].nm_nasabah,
					jk: response.data.data[0].jk,
					no_hp: response.data.data[0].no_hp,
					email: response.data.data[0].email,
					alamat: response.data.data[0].alamat,
					id_users: response.data.data[0].id_users,
				}
			});
		})
	} 

	updateNasabah = () => {
		let {editNasabah} = this.state;
		axios.post("http://127.0.0.1:8000/api/update-nasabah", editNasabah)
		.then((response) => {
			this.setState({
				status:response.status,
				message:response.data.message,
			}, ()=>this.getNasabah())
		})
	}

	hapusNasabah = (kd_nasabah) => {
		axios.delete('http://127.0.0.1:8000/api/delete-nasabah/' + kd_nasabah)
		.then((response) => {
			this.setState({
				status: response.status,
				message: response.data.message
			}, () => this.getNasabah())
		})
	}

	render() {
		const {dataNasabahBaru, status, message} = this.state;

		let sendMessage = "";
		if(status == 200) {
			sendMessage = <div className="alert alert-success" role="alert">{message}</div>
		} else if(status == "failed") {
			sendMessage = <div className="alert alert-danger" role="alert">{message}</div>
		} else {
			sendMessage = "";
		}

		if(sessionStorage.level == "nasabah") {
			return <Redirect to="/home" />
		}

		return(
			<div>
				<div className="container mb-5">
					<div className="card bg-dark">
						<div className="card-header">
							<h2>Nasabah Page</h2>	
						</div>
					</div>

					<div className="card bg-dark mt-2">
						<div className="card-header d-flex justify-content-between align-items-center">
							<h4>Data Nasabah</h4>
							<TambahNasabah
								tambahNasabah={this.tambahNasabah}
								onChangeHandler={this.onChangeHandler}
								dataNasabahBaru={dataNasabahBaru}
							/>

						</div>
						<EditNasabah
							editNasabah={this.state.editNasabah}
							onChangeEditHandler={this.onChangeEditHandler}
							updateNasabah={this.updateNasabah}
						/>
						<div className="card-body">
							{sendMessage}
							<ReactDatatable
								className="table table-dark table-bordered"
								config={this.config}
								columns={this.columns}
								records={this.state.nasabah}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Nasabah;