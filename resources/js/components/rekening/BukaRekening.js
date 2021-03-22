import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {faUser, faAddressCard, faMoneyBill, faFilePdf, faFileExcel} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactDatatable from '@ashvin27/react-datatable';
import './Rekening.css';


import Transaksi from './Transaksi';

class BukaRekening extends Component {
	constructor(props) {
		super(props);
		this.columns = [
			{
				key: "waktu",
				className: "waktu",
				text: "Waktu",
				sortable: true,
			},
			{
				key: "jenis_transaksi",
				className: "jenis_transaksi",
				text: "Jenis Transaksi",
				sortable: true,
			},
			{
				key: "nominal",
				className: "nominal",
				text: "Nominal",
				sortable: true,
			},
			{
				key: "status",
				className: "status",
				text: "Status",
				cell: (record, index) => {
					if(record.status == "menunggu konfirmasi") {
						return(<div className="badge badge-warning p-2">Menunggu Konfirmasi</div>)
					} else {
						return(<div className="badge badge-success p-2">Berhasil</div>)
					}
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
			history: [],
			dataRekening: {
				no_rekening: "",
				nm_nasabah: "",
				alamat: "",
				no_hp: "",
				email: "",
				saldo: "",
			}, 
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
			status: "",
			message: "",
		}
	}

	componentDidMount() {
		this.getRekening();
		this.getHistory();
	}

	getRekening() {
		const {params} = this.props.match;
		const {status} = this.state; 
	
		axios.get(`http://${window.location.host}/api/buka-rekening/${params.no_rekening}`)
		.then((response) => {
			this.setState({
				dataRekening: {
					no_rekening: response.data.data.no_rekening,
					nm_nasabah: response.data.data.nm_nasabah,
					alamat: response.data.data.alamat,
					no_hp: response.data.data.no_hp,
					email: response.data.data.email,
					saldo: response.data.data.saldo ? response.data.data.saldo : 0,
				},
				dataTransaksi: {
					nm_nasabah: response.data.data.nm_nasabah,
					id_transaksi: "",
					waktu: "",
					nominal: "",
					jenis_transaksi: "Transfer",
					no_rekening: response.data.data.no_rekening,
					kirim_tabungan: "",
					jenis_pembayaran: "",
					keterangan: "",
					status: "", 
				}
			})
		})

		if(status != "") {
			setTimeout(()=>{
				this.setState({
					status: "",
					message: "",
				})
			}, 1500)
		}
	}

	getHistory() {
		const {params} = this.props.match;

		axios.get(`http://${window.location.host}/api/where-history-transaksi/${params.no_rekening}`)
		.then((response) => {
			this.setState({
				history: response.data.data ? response.data.data : [],
			})
		})
	}

	resetTransfer = () => {
		this.setState({
			dataTransaksi: {
				kirim_tabungan: "",
				keterangan: "",
			}
		})
	}

	detailRekening = (no_rekening) => {
		axios.get(`http://${window.location.host}/api/where-rekening/${no_rekening}`)
		.then((response) => {
			this.setState({
				dataTransaksi: {
					no_rekening: response.data.data.no_rekening,
					nm_nasabah: response.data.data.nm_nasabah,
				}
			}, () => {this.getRekening()})
		});
	}

	onChangeTransaksiHandler = (e) => {
		let {dataTransaksi} = this.state;
		dataTransaksi[e.target.name] = e.target.value;
		this.setState({dataTransaksi});
		console.log(dataTransaksi);
	}

	handleTransaksi = () => {
		let {dataTransaksi, dataRekening} = this.state;

		console.log(dataTransaksi);

		if(dataTransaksi.jenis_transaksi == "Tarik") {
			if(dataRekening.saldo == 0 || (dataRekening.saldo - dataTransaksi.nominal) < 0) {
				this.setState({
					status: "failed",
					message: "Saldo Anda Tidak Mencukupi",
				}, () => {this.getRekening();this.getHistory()})
			} else {
				axios.post(`http://${window.location.host}/api/transaksi`, dataTransaksi)
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
					}, () => {this.getRekening();this.getHistory()});
				});
			}
		} else if(dataTransaksi.jenis_transaksi == "Transfer") {
			if(dataTransaksi.jenis_pembayaran == "Tabungan") {
				if(dataRekening.saldo == 0 || (dataRekening.saldo - dataTransaksi.nominal) < 0) {
					this.setState({
						status: "failed",
						message: "Saldo Anda Tidak Mencukupi",
					}, () => {this.getRekening();this.getHistory()})
				} else {
					axios.post(`http://${window.location.host}/api/transaksi`, dataTransaksi)
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
						}, () => {this.getRekening();this.getHistory()});
					});
				}
			} else {
				axios.post(`http://${window.location.host}/api/transaksi`, dataTransaksi)
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
						}, () => {this.getRekening();this.getHistory()});
					});
			}
		} else  {
			axios.post(`http://${window.location.host}/api/transaksi`, dataTransaksi)
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
				}, () => {this.getRekening();this.getHistory()});
			});
		}
	}

	render() {

		const {dataRekening, history, dataTransaksi, status, message} = this.state;
		const {params} = this.props.match;

		let sendMessage = "";
		if(status == "failed") {
			sendMessage = <div className="alert alert-danger" role="alert">{message}</div>
		} else if(status == 200) {
			sendMessage = <div className="alert alert-success" role="alert">{message}</div>
		} else {
			sendMessage = "";
		}


		let buttonTransaksi, transaksi = "";
		if(localStorage.level != 'Nasabah') {
			buttonTransaksi = 	<button
									className="btn btn-primary btn-md ml-2"
									data-target="#modalTransaksi" data-toggle="modal"
									onClick = {()=>{this.detailRekening(params.no_rekening)}}
								>
									<FontAwesomeIcon icon={faMoneyBill} /> Transaksi
								</button>;

			transaksi =	<Transaksi 
							handleTransaksi={this.handleTransaksi}
							onChangeTransaksiHandler={this.onChangeTransaksiHandler}
							dataTransaksi={dataTransaksi}
						/>;
		} else {
			buttonTransaksi, transaksi = "";
		}

		let buttonLaporan = "";
		if(localStorage.level == "Administrator") {
			buttonLaporan = <div className="d-flex">
								<a 
									className="btn btn-success btn-md mr-2"
									href={'http://' + window.location.host + '/api/exportExcelTransaksi/' + params.no_rekening}
								>
									<FontAwesomeIcon icon={faFileExcel}/> Export Excel
								</a>

								<a
									className="btn btn-danger btn-md"
									href={'http://' + window.location.host + '/api/exportPdfTransaksi/' + params.no_rekening}
								>
									<FontAwesomeIcon icon={faFilePdf}/> Export PDF
								</a>
							</div>
		} else {
			buttonLaporan = "";
		}

		return(
			<div>
				<div className="d-flex justify-content-center">
					<div className="card bg-dark col-md-6 mr-1">
						<div className="card-header">
							<h5>
								No Rekening
							</h5>
						</div>
						<div className="card-body">
							<h3 className="d-flex align-items-center">
								<div className="box-icon mr-2">
									<FontAwesomeIcon icon={faAddressCard} />
								</div> 
								{dataRekening.no_rekening}
							</h3>
						</div>
						<div className="card-footer">
							<p>
								<FontAwesomeIcon icon={faUser} className="mr-2"/> {dataRekening.nm_nasabah}
							</p>
						</div>
					</div>

					<div className="card bg-dark col-md-6 ml-1">
						<div className="card-header">
							<h5>
								Saldo Rekening
							</h5>
						</div>
						<div className="card-body">
							<h3 className="d-flex align-items-center">
								<div className="box-icon mr-2">
									<FontAwesomeIcon icon={faMoneyBill} />
								</div> 
								{'Rp.' + dataRekening.saldo}
							</h3>
						</div>
					</div>
				</div>

				<div className="d-flex justify-content-center">
					<div className="card bg-dark col-md-8 mr-1 mt-2 mb-5">
						<div className="card-header">
							<div className="d-flex justify-content-between">
								<h4>Transaksi Terakhir</h4>
								<div className="d-flex">
									{buttonLaporan}
									{buttonTransaksi}
								</div>
							</div>
						</div>
						<div className="card-body">
							{sendMessage}
							{transaksi}
							<ReactDatatable 
								className="table table-dark table-bordered"
								columns={this.columns}
								records={history}
								config={this.config}
							/>
						</div>
					</div>

					<div className="card bg-dark col-md-4 ml-1 mt-2 mb-5">
						<div className="card-header">
							<h4>Transfer Rekening Lain</h4>
						</div>
						<div className="card-body">
							<input 
								type="hidden"
								name="jenis_transaksi"
								value="Transfer"
								onChange={this.onChangeTransaksiHandler}/>
							<div className="form-group">
								<label htmlFor="no_rekening">No Rekening Anda</label>
								<input 
									type="text" 
									name="no_rekening" 
									className="form-control bg-dark text-white" 
									value={dataRekening.no_rekening}
									onChange={this.onChangeTransaksiHandler}
									readOnly
								/>
							</div>

							<div className="form-group">
								<label htmlFor="kirim_tabungan">Transfer Ke</label>
								<input 
									type="number"
									name="kirim_tabungan"
									placeholder="e.g 9875432123456"
									className="form-control bg-dark text-white"
									value={dataRekening.kirim_tabungan}
									onChange={this.onChangeTransaksiHandler}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="nominal">Nominal</label>
								<input 
									type="number"
									name="nominal"
									placeholder="e.g 200000"
									className="form-control bg-dark text-white"
									value={dataTransaksi.nominal}
									onChange={this.onChangeTransaksiHandler}
								/>
							</div>
							
			        		<div className="form-group d-flex">
								<div className="form-check mr-3">
				        			<input
				        				type="radio"
				        				name="jenis_pembayaran"
				        				className="form-check-input"
				        				value="Cash"
				        				onChange={this.onChangeTransaksiHandler}
				        			/>
				        			<label className="form-check-label">Cash</label>
			        			</div>
			        			<div className="form-check">
				        			<input
				        				type="radio"
				        				name="jenis_pembayaran"
				        				className="form-check-input"
				        				value="Tabungan"
				        				onChange={this.onChangeTransaksiHandler}
				        			/>
				        			<label className="form-check-label">Tabungan</label>
			        			</div>
							</div>

							<div className="form-group">
								<label htmlFor="keterangan">Keterangan</label>
								<textarea
									name="keterangan"
									className="form-control bg-dark text-white"
									value={dataTransaksi.keterangan}
									onChange={this.onChangeTransaksiHandler}
								></textarea>
							</div>
						</div>
						<div className="card-footer">
							<div className="ml-auto">
								<button className="btn btn-secondary mr-2" onClick={()=>{this.resetTransfer()}}>Reset</button>
								<button className="btn btn-primary" onClick={() => {this.handleTransaksi()}}>Transfer</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BukaRekening;