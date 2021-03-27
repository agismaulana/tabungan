import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {faUser, faMoneyCheck, faMoneyBill, faFilePdf, faFileExcel, faPrint} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactDatatable from '@ashvin27/react-datatable';
import './Rekening.css';


import Transaksi from './Transaksi';

class BukaRekening extends Component {
	constructor(props) {
		super(props);
		this.columns = [
			{
				key: "transaksi_id",
				className: "transaksi_id",
				text: "Id Transaksi",
				sortable: true,
			},
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
					return(<div className="badge badge-success p-2">Berhasil</div>)
				}
			}, 
			{
				key: "aksi",
				className: "aksi",
				text: "Aksi",
				cell: (record, index) => {
					return(
							<button 
								onClick={() => {this.handleCetak(record.transaksi_id)}}
								className="btn btn-primary btn-md">
								<FontAwesomeIcon icon={faPrint}/> Print
							</button>
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
				level: "",
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
				pin: "",
			},
			saldoTransfer: "",
			dateGenerate: {
				mulai_tanggal: "",
				sampai_tanggal: "",
			},
			status: "",
			message: "",
		}
	}

	componentDidMount() {
		this.getRekening();
		this.getSaldoTransfer();
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
					level: localStorage.level,
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
					pin: "", 
				},
			})
		})

		if(status != "") {
			setTimeout(()=>{
				this.setState({
					status: "",
					message: "",
				})
			}, 3000)
		}
	}

	getSaldoTransfer() {
		const {params} = this.props.match;
		axios.get(`http://${window.location.host}/api/saldo-transfer/${params.no_rekening}`)
		.then((response) => {
			this.setState({
				saldoTransfer: response.data.data.saldo_transfer,
			})
		})
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
		let newDataTransaksi = {...this.state.dataTransaksi}
		let {dataTransaksi} = this.state;
		newDataTransaksi[e.target.name] = e.target.value;
		this.setState({dataTransaksi: newDataTransaksi});
	}

	handleTransaksi = () => {
		let {dataTransaksi, dataRekening, saldoTransfer} = this.state;

		if(dataTransaksi.nominal == "") {
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
					pin: "",
				},
				status: "failed",
				message: "Masukkan Nominal Terlebih Dahulu",
			}, () => {this.getRekening();this.getHistory()})
		} else {
			if(dataTransaksi.jenis_transaksi == "Tarik") {
				if(parseInt(dataRekening.saldo + saldoTransfer) == 0 || (parseInt(dataRekening.saldo + saldoTransfer) - dataTransaksi.nominal) < 0) {
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
								pin: "",
							},
							status: response.data.status,
							message: response.data.message,
						}, () => {this.getRekening();this.getHistory()});
					});
				}
			} else if(dataTransaksi.jenis_transaksi == "Transfer") {
				if(parseInt(dataRekening.saldo + saldoTransfer) == 0 || (parseInt(dataRekening.saldo + saldoTransfer) - dataTransaksi.nominal) < 0) {
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
								pin: "",
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
							pin: "",
						},
						status: response.data.status,
						message: response.data.message,
					}, () => {this.getRekening();this.getHistory()});
				});
			}
		}
	}

	onhandleDateGenerate = (e) => {
		let {name, value} = e.target;
		let {dateGenerate} = this.state;
		dateGenerate[name] = value;
		this.setState({dateGenerate});
	}

	handlePdf = () => {
		let {dateGenerate} = this.state;
		let {params}	   = this.props.match;
		if(dateGenerate.sampai_tanggal != "" && dateGenerate.mulai_tanggal != "") {
			axios({
				url:`http://${window.location.host}/api/exportPdfTransaksi/${params.no_rekening}`,
				method: "POST",
				data: dateGenerate,
				responseType: 'blob',
			}).then((response) => {
				if(response.data.status != "failed") {
					this.setState({
						dateGenerate: {
							mulai_tanggal: "",
							sampai_tanggal: "",
						}
					}, () => {this.getRekening()})
					const url = window.URL.createObjectURL(new Blob([response.data]))
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'transaksi-laporan-'+params.no_rekening+'.pdf');
					document.body.appendChild(link);
					link.click();
				} else {
					this.setState({
						status: response.data.status,
						message: response.data.message
					}, () => {this.getRekening()})
				}
			})
		} else {
			this.setState({
				status: "failed",
				message: "Pilih Tanggal Terlebih Dahulu",
			}, () => {this.getRekening()})
		}
	}

	handleCetak = (id_transaksi) => {
		axios({
			url:`http://${window.location.host}/api/cetak-struk-transaksi/${id_transaksi}`,
			method: "GET",
			responseType: 'blob',
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]))
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'cetak-struk-'+id_transaksi+'.pdf');
			document.body.appendChild(link);
			link.click();
		})
	}

	render() {

		const { dataRekening, 
				dataTransaksi, 
				dateGenerate,
				saldoTransfer,
				history, 
				status, 
				message, 
			} = this.state;
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


								<div>								
									<button 
										className="btn btn-danger btn-md mr-2" 
										data-target="#modalPdf"
										data-toggle="modal">
											<FontAwesomeIcon icon={faFilePdf}/> Export PDF
									</button>

									<div className="modal fade" id="modalPdf" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
									  	<div className="modal-dialog col-md-12">
									    	<div className="modal-content bg-dark">
									      		<div className="modal-header">
									        		<h5 className="modal-title font-weigth-bold" id="exampleModalLabel">Transaksi</h5>
									      		</div>
									      		<div className="modal-body">
							        				<div className="form-group">
							        					<label htmlFor="mulai_tanggal">
							        						Mulai Tanggal
							        					</label>
							        					<input 
							        						type="date"
							        						className="form-control bg-dark text-white"
							        						name="mulai_tanggal"
							        						value={dateGenerate.mulai_tanggal}
							        						onChange={this.onhandleDateGenerate}
							        					/>

							        					<label htmlFor="mulai_tanggal">
							        						Sampai Tanggal
							        					</label>
							        					<input 
							        						type="date"
							        						className="form-control bg-dark text-white"
							        						name="sampai_tanggal"
							        						value={dateGenerate.sampai_tanggal}
							        						onChange={this.onhandleDateGenerate}
							        					/>
							        				</div>
									      		</div>
									      		<div className="modal-footer">
									        		<button 
									        			type="button" 
									        			className="btn btn-danger" 
									        			data-dismiss="modal"
									        		>
									        			Tidak
									        		</button>
									        		<button 
									        			type="button" 
									        			className="btn btn-success" 
									        			onClick={()=>this.handlePdf()}
									        			data-dismiss="modal"
									        		>
									        			Generate
									        		</button>
									      		</div>
									    	</div>
									  	</div>
									</div>
								</div>
							</div>
							;
		} else {
			buttonLaporan = "";
		}

		let pin = "";
		if(localStorage.level == "Nasabah") {
			pin = <div className="form-group">
					<label htmlFor="pin">PIN</label>
					<input 
						className="form-control bg-dark text-white" 
						name="pin"
						type="password"
						maxLength="6"
						value={dataTransaksi.pin}
						onChange={this.onChangeTransaksiHandler}
					/>
				  </div>;
		} else {
			pin = "";
		}

		let tujuanTransfer = "";
		if(dataTransaksi.jenis_pembayaran == "Non Pembayaran") {
			tujuanTransfer = <div className="form-group">
								<label htmlFor="kirim_tabungan">Transfer No Rekening</label>
								<input 
									type="number"
									name="kirim_tabungan"
									placeholder="e.g 9875432123456"
									className="form-control bg-dark text-white"
									value={dataRekening.kirim_tabungan}
									onChange={this.onChangeTransaksiHandler}
								/>
							</div>
		} else {
			tujuanTransfer = "";
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
									<FontAwesomeIcon icon={faMoneyCheck} />
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
								{'Rp.' + parseInt(dataRekening.saldo + saldoTransfer)}
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
							<div>
								<ReactDatatable 
									className="table table-dark table-bordered table-responsive"
									columns={this.columns}
									records={history}
									config={this.config}
								/>
							</div>
						</div>
					</div>

					<div className="card bg-dark col-md-4 ml-1 mt-2 mb-5">
						<div className="card-header">
							<h4>Transfer</h4>
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

							<div className="form-group d-flex">
								<div className="form-check mr-3">
					    			<input
					    				type="radio"
					    				name="jenis_pembayaran"
					    				className="form-check-input"
					    				value="Non Pembayaran"
					    				onChange={this.onChangeTransaksiHandler}
					    				checked={dataTransaksi.jenis_pembayaran == "Non Pembayaran" ? "checked" : ""}
					    			/>
					    			<label className="form-check-label">Non Pembayaran</label>
								</div>
			        			<div className="form-check">
				        			<input
				        				type="radio"
				        				name="jenis_pembayaran"
				        				className="form-check-input"
				        				value="Pembayaran"
				        				checked={dataTransaksi.jenis_pembayaran == "Pembayaran" ? "checked" : ""}
				        				onChange={this.onChangeTransaksiHandler}
				        			/>
				        			<label className="form-check-label">Pembayaran</label>
			        			</div>
							</div>

							{tujuanTransfer}
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
							
							<div className="form-group">
								<label htmlFor="keterangan">Keterangan</label>
								<textarea
									name="keterangan"
									className="form-control bg-dark text-white"
									value={dataTransaksi.keterangan}
									onChange={this.onChangeTransaksiHandler}
								></textarea>
							</div>

							{pin}
						</div>
						<div className="card-footer">
							<div className="ml-auto">
								<button 
									className="btn btn-primary" 
									onClick={() => {this.handleTransaksi()}}
								>
									<FontAwesomeIcon icon={faMoneyBill}/> Transfer
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BukaRekening;