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
									className="btn btn-primary btn-sm"
									onClick={()=>{this.konfirmasi(record.id_transfer)}}>
										Konfirmasi
								</button>
					} else {
						return <div className="badge badge-success badge-sm">Berhasil</div>
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
			}, 1500)
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

	render() {
		const {transaksi, status, message} = this.state;

		if(localStorage.level == "Nasabah") {
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
									href={"http://"+window.location.host+"/api/ExportExcelHistory"}
									className="btn btn-success btn-md mr-2"
								> 
									<FontAwesomeIcon icon={faFileExcel}/> Export Excel
								</a>
								<a href={"http://"+window.location.host+"/api/exportPdfHistory"} className="btn btn-danger btn-md">
									<FontAwesomeIcon icon={faFilePdf}/> Print Pdf
								</a>
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
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default History;