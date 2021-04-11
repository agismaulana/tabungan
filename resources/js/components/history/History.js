import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';

import {faFilePdf, faFileExcel} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class History extends Component {

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
				key: "transaksi_rekening",
				className: "transaksi_rekening",
				text: "Transaksi Rekening",
				sortable: true,
			},
			{
				key: "waktu",
				className: "waktu",
				text: "Waktu",
				sortable: true,
			},
			{
				key: "nominal",
				className: "nominal",
				text: "Nominal",
				sortable: true,
				cell: (record, index) => {
					let nominal = new Intl.NumberFormat('de-DE', {maximumSignificanDigits:3}).format(record.nominal);
					return(<p>{'Rp.' + nominal}</p>)
				}
			},
			{
				key: "jenis_transaksi",
				className: "jenis_transaksi",
				text: "Jenis Transaksi",
				sortable: true,
			},
			{
				key: "jenis_pembayaran",
				className: "jenis_pembayaran",
				text: "Jenis Pembayaran",
				sortable: true,
				cell: (record) => {
					if(record.jenis_pembayaran == null) {
						return <p>-</p>
					} else {
						return <p>{record.jenis_pembayaran}</p>
					}
				}
			},
			{
				key: "no_rekening",
				className: "no_rekening",
				text: "Transfer Rekening",
				sortable: true,
				cell: (record) => {
					if(record.no_rekening == null) {
						return <p>-</p>
					} else {
						return <p>{record.no_rekening}</p>
					}
				}
			}, 
			{
				key: "status",
				className: "status",
				text: "Status",
				cell: (record, index) => {
					if(record.status == "menunggu konfirmasi") {
						return <button 
									className="btn btn-primary btn-md"
									onClick={()=>{this.konfirmasi(record.id_transfer)}}>
										Konfirmasi
								</button>
					} else {
						return <div className="badge badge-success badge-md p-2">Berhasil</div>
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
			transaksi: [],
			dateGenerate: {
				mulai_tanggal: "",
				sampai_tanggal: "",
			},
			status: "",
			message: "",
		}
	}

	componentDidMount() {
		this.getTransaksi();
	}

	getTransaksi() {
		axios.get(`http://${window.location.host}/api/transaksi`)
		.then((response) => {
			this.setState({
				transaksi: response.data.data ? response.data.data : [],
			})
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

	konfirmasi = (id_transfer) => {
		axios.post(`http://${window.location.host}/api/change-status/${id_transfer}`)
		.then((response) => {
			this.setState({
				status: response.data.status,
				message: response.data.message,
			}, () => this.getTransaksi())
		})
	}

	onhandleDateGenerate = (e) => {
		let {name, value} = e.target;
		let {dateGenerate} = this.state;
		dateGenerate[name] = value;
		this.setState({dateGenerate});
	}

	handlePdf = () => {
		let {dateGenerate} = this.state;
		if(dateGenerate.sampai_tanggal != "" && dateGenerate.mulai_tanggal != "") {
			axios({
				url:`http://${window.location.host}/api/exportPdfHistory`,
				method: "POST",
				data: dateGenerate,
				responseType: 'blob',
			}).then((response) => {
				this.setState({
					dateGenerate: {
						mulai_tanggal: "",
						sampai_tanggal: "",
					}
				}, () => {this.getTransaksi()})
				const url = window.URL.createObjectURL(new Blob([response.data]))
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'laporan-history.pdf');
				document.body.appendChild(link);
				link.click();
			})
		} else {
			this.setState({
				status: "failed",
				message: "Pilih Tanggal Terlebih Dahulu",
			}, () => {this.getTransaksi()})
		}
	}

	render() {
		const {transaksi, status, message, dateGenerate} = this.state;

		if(localStorage.level != "Administrator") {
			return <Redirect to="/home" />
		}

		let sendMessage = "";
		if(status == 200) {
			sendMessage = <div className="alert alert-success" role="alert">{message}</div>
		} else if(status == "failed") {
			sendMessage = <div className="alert alert-danger" role="alert">{message}</div>
		} else {
			sendMessage = "";
		}

		let buttonLaporan = "";
		if(localStorage.level == "Administrator") {
			buttonLaporan = <div className="d-flex">
								<a 
									href={"http://"+window.location.host+"/api/exportExcelHistory"}
									className="btn btn-success btn-md mr-2"
								> 
									<FontAwesomeIcon icon={faFileExcel}/> Export Excel
								</a>

								<div>
									<button 
										className="btn btn-danger"
										data-target="#modalPdf"
										data-toggle="modal"
									>
										<FontAwesomeIcon icon={faFilePdf}/> Export Pdf
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
							</div>;
		} else {
			buttonLaporan = "";
		}

		return(
			<div>
				<div className="card bg-dark">
					<div className="card-header">
						<div className="d-flex justify-content-between align-items-center">
							<h4>History Transaksi</h4>
							{buttonLaporan}
						</div>
					</div>
					<div className="card-body">
						<div>
							{sendMessage}
							<ReactDatatable
								className="table table-dark table-bordered table-responsive"
								records={transaksi}
								columns={this.columns}
								config={this.config}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default History;