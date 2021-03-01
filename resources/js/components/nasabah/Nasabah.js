import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import TambahNasabah from './TambahNasabah';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactDatatable from '@ashvin27/react-datatable';

class Nasabah extends React.Component{

	constructor(props) {
		super(props);
		this.columns = [
			{
				key:"nm_nasabah",
				className: "nm_nasabah",
				text:"Nama Nasabah",
				sorting: true,
			},
			{
				key:"jk",
				className:"jk",
				text:"Jenis Kelamin",
				sorting: true,
			},
			{
				key:"no_hp",
				className: "no_hp",
				text:"No. Telepon",
				sorting: true,
			},
			{
				key:"email",
				className:"email",
				text:"Email",
				sorting: true,
			},
			{
				key:"alamat",
				className:"alamat",
				text:"Alamat",
				sorting: true,
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
								onClick={this.editNasabah}
							>
								<FontAwesomeIcon icon={faEdit} /> Edit
							</button>
							<button
								className="btn btn-danger btn-sm ml-2"
							>
								<FontAwesomeIcon icon={faTrash} /> Hapus
							</button>
						</div>
					)
				}
			}
		];
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
			status: "",
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
	}

	onChangeHandler = (e) => {
		let {dataNasabahBaru} = this.state;
		dataNasabahBaru[e.target.name] = e.target.value;
		this.setState({dataNasabahBaru});
	}

	tambahNasabah = () => {

		console.log(this.state);

		// axios.post("http://127.0.0.1:8000/api/tambah-nasabah", this.state.dataNasabahBaru)
		// .then((response) => {
		// 	const {nasabah} = this.state;
		// 	const nasabahBaru = [...nasabah];
		// 	console.log(nasabahBaru)
		// })
	}

	editNasabah() {
		console.log('edit');
	} 

	render() {
		const {dataNasabahBaru} = this.state;

		if(sessionStorage.level == "nasabah") {
			return <Redirect to="/home" />
		}
		return(
			<div>
				<div className="container">
					<div className="card bg-dark">
						<div className="card-header">
							<h2>Nasabah Page</h2>	
						</div>
					</div>

					<div className="card bg-dark mt-3">
						<div className="card-header d-flex justify-content-between">
							<h5>Data Nasabah</h5>
							<TambahNasabah
								tambahNasabah={this.tambahNasabah}
								onChangeHandler={this.onChangeHandler}
								dataNasabahBaru={dataNasabahBaru}
							/>
						</div>
						<div className="card-body">
							<ReactDatatable
								className="table table-dark table-bordered"
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