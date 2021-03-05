import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {faEdit, faInfo, faMoneyBill} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactDatatable from '@ashvin27/react-datatable';

import Transaksi from './Transaksi';
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
							<button
								className="btn btn-primary btn-md ml-2"
								data-target="#modalTransaksi" data-toggle="modal"
								onClick={() => {this.detailRekening(record.no_rekening)}}
							>
								<FontAwesomeIcon icon={faMoneyBill} />
							</button>
							<button
								className="btn btn-success btn-md ml-2"
								data-target="#modalEdit" data-toggle="modal"
								onClick={() => {this.editRekening(record.no_rekening)}}
							>
								<FontAwesomeIcon icon={faEdit} />
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
		if(sessionStorage.level != "Nasabah") {
			axios.get("http://127.0.0.1:8000/api/rekening")
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
					}, 2000)
				}
			})
		}
	}

	onChangeTransaksiHandler = (e) => {
		let {dataTransaksi} = this.state;
		dataTransaksi[e.target.name] = e.target.value;
		this.setState({dataTransaksi});
	}

	onChangeEditHandler = (e) => {
		let {editRekening} = this.state;
		editRekening[e.target.name] = e.target.value;
		this.setState({editRekening});	
	}


	detailRekening = (no_rekening) => {
		axios.get('http://127.0.0.1:8000/api/where-rekening/' + no_rekening)
		.then((response) => {
			this.setState({
				dataTransaksi: {
					no_rekening: response.data.data.no_rekening,
					nm_nasabah: response.data.data.nm_nasabah,
				}
			})
		});
	}

	editRekening = (no_rekening) => {
		axios.get('http://127.0.0.1:8000/api/where-rekening/' + no_rekening)
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

		axios.post('http://127.0.0.1:8000/api/edit-rekening', editRekening)
		.then((response) => {
			this.setState({
				status: response.data.status,
				message: response.data.message,
			}, () => this.getRekening());
		})
	}

	handleTransaksi = () => {
		let {dataTransaksi} = this.state;
		axios.post('http://127.0.0.1:8000/api/transaksi', dataTransaksi)
		.then((response) => {
			this.setState({
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
				status: response.data.status,
				message: response.data.message,
			}, () => {this.getRekening()});
		});
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

		if(sessionStorage.level == "nasabah") {
			return <Redirect to="/home" />
		}

		return(
			<div>
				<div className="card bg-dark mb-2">
					<div className="card-header">
						<h3>Rekening Page</h3>
					</div>
				</div>

				<Transaksi 
					handleTransaksi={this.handleTransaksi}
					onChangeTransaksiHandler={this.onChangeTransaksiHandler}
					dataTransaksi={dataTransaksi}
				/>

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