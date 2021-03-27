import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {faEdit, faInfo, faBookOpen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactDatatable from '@ashvin27/react-datatable';

import EditRekening from './EditRekening';

class Rekening extends Component {
	constructor(props) {
		super(props);
		this.columns = [
			{
				key: "no_rekening",
				className: "no_rekening",
				text: "No Rekening",
				sortable: true,
			},
			{
				key: "nm_nasabah",
				className: "nm_nasabah",
				text: "Nama Nasabah",
				sortable: true,
			},
			{
				key: "action",
				className:"action",
				text: "Action",
				cell: (record, index) => {
					return(
						<div>

							<a
								href={'buka-rekening/'+record.no_rekening}
								className="btn btn-primary btn-md ml-2"
							>
								<FontAwesomeIcon icon={faBookOpen}/> Buka Rekening
							</a>
							
							<button
								className="btn btn-success btn-md ml-2"
								data-target="#modalEdit" data-toggle="modal"
								onClick={() => {this.editRekening(record.no_rekening)}}
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
			rekening: [],
			dataTransaksi: {
				nm_nasabah: "",
				id_transaksi: "",
				waktu: "",
				nominal: "",
				jenis_transaksi: "",
				no_rekening: "",
				kirim_tabungan: "",
				jenis_pembayaran: "",
				keterangan: "",
				status: "",
			},
			editRekening: {
				no_rekening: "",
				pin_lama: "",
				pin_baru: "",
			},
			status: "",
			message: "",
		}
	}

	componentDidMount() {
		this.getRekening();
	}

	getRekening() {
		if(localStorage.level != "Nasabah") {
			axios.get(`http://${window.location.host}/api/rekening`)
			.then((response) => {
				if(response.status == 200) {
					this.setState({
						rekening: response.data.data ? response.data.data : [],
					})
				} else if(response.status == "failed") {
					this.setState({
						rekening: response.data.message,
					})
				}

				if(this.state.status != "") {
					setTimeout(() => {
						this.setState({
							status: "",
							message: "",
						})
					}, 3000)
				}
			})
		}
	}

	

	onChangeEditHandler = (e) => {
		let {editRekening} = this.state;
		editRekening[e.target.name] = e.target.value;
		this.setState({editRekening});	
	}

	editRekening = (no_rekening) => {
		axios.get(`http://${window.location.host}/api/where-rekening/${no_rekening}`)
		.then((response) => {
			this.setState({
				editRekening: {
					no_rekening: response.data.data.no_rekening,
				}
			})
		});
	}

	updateRekening = () => {
		let {editRekening} = this.state;

		axios.post(`http://${window.location.host}/api/edit-rekening`, editRekening)
		.then((response) => {
			this.setState({
				editRekening: {
					no_rekening: "",
					pin_lama: "",
					pin_baru: "",
				},
				status: response.data.status,
				message: response.data.message,
			}, () => this.getRekening());
		})
	}

	render() {
		let {rekening, dataTransaksi, editRekening, status, message} = this.state;
		
		let sendMessage = "";
		if(status == 200) {
			sendMessage = <div className="alert alert-success" role="alert">{message}</div>
		} else if(status == "failed") {
			sendMessage = <div className="alert alert-danger" role="alert">{message}</div>
		} else {
			sendMessage = "";
		}

		if(localStorage.level == "Nasabah") {
			return <Redirect to="/home" />
		}

		return(
			<div>
				<EditRekening
					updateRekening={this.updateRekening}
					onChangeEditHandler={this.onChangeEditHandler}
					editRekening={editRekening}
				/>

				<div className="card bg-dark">
					<div className="card-header">
						<h4>Data Rekening</h4>
					</div>
					<div className="card-body">
						{sendMessage}
						<ReactDatatable
							className="table table-dark table-bordered"
							columns={this.columns}
							records={rekening}
							config={this.config}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default Rekening;