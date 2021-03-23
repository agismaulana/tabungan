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
						<div className="d-flex">
							<button
								className="btn btn-success btn-sm"
								data-target="#modalEdit" data-toggle="modal"
								onClick={() => {this.editNasabah(record.kd_nasabah)}}
							>
								<FontAwesomeIcon icon={faEdit} />
							</button>
							<div>
								<button
									className="btn btn-danger btn-sm ml-2"
									data-target="#modalHapus"
									data-toggle="modal"
								>
									<FontAwesomeIcon icon={faTrash} />
								</button>


								<div className="modal fade" id="modalHapus" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
								  	<div className="modal-dialog">
								    	<div className="modal-content bg-dark">
								      		<div className="modal-header">
								        		<h5 className="modal-title font-weigth-bold" id="exampleModalLabel">Hapus Data Nasabah</h5>
								      		</div>
								      		<div className="modal-body">
								      			<h5>Yakin Data Akan Dihapus?</h5>
								      		</div>
								      		<div className="modal-footer">
								        		<button 
								        			type="button" 
								        			className="btn btn-danger" 
								        			data-dismiss="modal"
								        		>
								        			Close
								        		</button>
								        		<button 
								        			type="button" 
								        			className="btn btn-success" 
								        			onClick={()=>this.hapusNasabah(record.kd_nasabah)}
								        			data-dismiss="modal"
								        		>
								        			Hapus
								        		</button>
								      		</div>
								    	</div>
								  	</div>
								</div>
							</div>
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
			dataUsersBaru: {
				id_users: "",
				username: "",
				password: "",
				level: "",
				pin: "",
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
			}, 1500)
		}
	}

	onChangeHandler = (e) => {
		let {dataNasabahBaru, dataUsersBaru} = this.state;
		dataNasabahBaru[e.target.name] 	= e.target.value;
		dataUsersBaru[e.target.name]	= e.target.value;
		this.setState({dataNasabahBaru, dataUsersBaru});
	}

	tambahNasabah = () => {
		let {dataNasabahBaru, dataUsersBaru} = this.state;

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
				}
			});
		})
	} 

	updateNasabah = () => {
		let {editNasabah} = this.state;
		axios.post(`http://${window.location.host}/api/update-nasabah`, editNasabah)
		.then((response) => {
			this.setState({
				status:response.status,
				message:response.data.message,
			}, ()=>this.getNasabah())
		})	
	}

	hapusNasabah = (kd_nasabah) => {
		axios.delete(`http://${window.location.host}/api/delete-nasabah/${kd_nasabah}`)
		.then((response) => {
			this.setState({
				status: response.status,
				message: response.data.message
			}, () => this.getNasabah())
		})
	}

	render() {
		const {dataNasabahBaru, dataUsersBaru, status, message} = this.state;

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
								dataUsersBaru={dataUsersBaru}
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