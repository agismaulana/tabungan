import React, {Component} from 'react';

import {faUsers, faUserTie, faMoneyBill} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataUsers: {
				nm_users: "",
				email: "",
			},
			dataCount: {
				jumlahNasabah: "",
				jumlahPegawai: "",
				jumlahTransaksi: "",
				saldoTransaksi: "",
			},
			date: "",
		}
	}

	componentDidMount() {
		this.getUsers();
		setInterval(() => {
			this.getTime();
		}, 1000)
		if(localStorage.level != "Nasabah") {
			this.getCount();
		}
	}

	getUsers() {

		const idUsers = localStorage.id_users;

		if(localStorage.level == "Nasabah") {
			axios.get(`http://${window.location.host}/api/join-nasabah/${idUsers}`)
			.then((response) => {
				this.setState({
					dataUsers: {
						nm_users: response.data.data.nm_nasabah,
						email: response.data.data.email,
					}
				})
			})
		} else {
			axios.get(`http://${window.location.host}/api/join-pegawai/${idUsers}`)
			.then((response) => {
				this.setState({
					dataUsers: {
						nm_users: response.data.data.nm_pegawai,
						email: response.data.data.email,
					}
				})
			})
		}
	}

	getCount() {
		axios.get(`http://${window.location.host}/api/jumlah`)
		.then((response) => {
			this.setState({
				dataCount: {
					jumlahNasabah: response.data.data.jumlahNasabah,
					jumlahPegawai: response.data.data.jumlahPegawai,
					jumlahTransaksi: response.data.data.jumlahTransaksi,
					saldoTransaksi: response.data.data.saldoTransaksi,
				}
			})
		})
	}

	getTime = () => {
		let date = new Date().toLocaleString();

		this.setState({
			date: date,
		})
	}

	render() {

		const {dataUsers, dataCount, date} = this.state;

		let dashboard;
		if(localStorage.level == 'Administrator') {
			dashboard = <div className="d-flex justify-content-around">
							<div className="card col-md-3 bg-primary mr-2">
								<div className="card-body">
									<div className="d-flex justify-content-between">
										<FontAwesomeIcon icon={faUsers} className="fa-3x" />
										<h2>{dataCount.jumlahNasabah}</h2>
									</div>
									<hr/>
									<h5>Jumlah Nasabah</h5>
								</div>
							</div>
							<div className="card col-md-3 bg-danger mr-2">
								<div className="card-body">
									<div className="d-flex justify-content-between">
										<FontAwesomeIcon icon={faUserTie} className="fa-3x" />
										<h2>{dataCount.jumlahPegawai}</h2>
									</div>
									<hr/>
									<h5>Jumlah Pegawai</h5>
								</div>
							</div>
							<div className="card col-md-3 bg-dark mr-2">
								<div className="card-body">
									<div className="d-flex justify-content-between">
										<FontAwesomeIcon icon={faMoneyBill} className="fa-3x" />
										<h2>{dataCount.jumlahTransaksi}</h2>
									</div>
									<hr/>
									<h5>Jumlah Transaksi</h5>
								</div>
							</div>
							<div className="card col-md-3 bg-success">
								<div className="card-body">
									<div className="d-flex justify-content-between">
										<FontAwesomeIcon icon={faMoneyBill} className="fa-3x" />
										<h2>{dataCount.saldoTransaksi}</h2>
									</div>
									<hr/>
									<h5>Saldo Transaksi</h5>
								</div>
							</div>
						</div>
		} else if(localStorage.level == 'Operator') {
			dashboard = <div className="d-flex justify-content-around">
							<div className="card col-md-4 bg-primary mr-2">
								<div className="card-body">
									<div className="d-flex justify-content-between">
										<FontAwesomeIcon icon={faUsers} className="fa-3x" />
										<h2>{dataCount.jumlahNasabah}</h2>
									</div>
									<hr/>
									<h5>Jumlah Nasabah</h5>
								</div>
							</div>
							<div className="card col-md-4 bg-danger mr-2">
								<div className="card-body">
									<div className="d-flex justify-content-between">
										<FontAwesomeIcon icon={faMoneyBill} className="fa-3x" />
										<h2>{dataCount.jumlahTransaksi}</h2>
									</div>
									<hr/>
									<h5>Jumlah Transaksi</h5>
								</div>
							</div>
							<div className="card col-md-4 bg-success">
								<div className="card-body">
									<div className="d-flex justify-content-between">
										<FontAwesomeIcon icon={faMoneyBill} className="fa-3x" />
										<h2>{dataCount.saldoTransaksi}</h2>
									</div>
									<hr/>
									<h5>Saldo Transaksi</h5>
								</div>
							</div>
						</div>
		}	

		return(
			<div>
				<div className="container">
					{dashboard}
					<div className="row jumbotron fluid-jumbotron mt-2 bg-dark">
						<div className="jumbotron-body col-md-12 text-white">
							<h3>Selamat Datang, {dataUsers.nm_users}</h3>
							<hr/>
							<div className="d-flex justify-content-between">
								<p>Selamat Menggunakan Aplikasi MyDeposits</p>
								<p>{date}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Home;