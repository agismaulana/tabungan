import React,{Component} from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import {Redirect} from 'react-router-dom';
import {
	faEdit,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import EditUsers from './EditUsers';

class User extends Component {

	constructor(props) {
		super(props);
		this.columns = [
			{
				key:"id_users",
				className: "id_users",
				text:"Id User",
				sortable: true,
			},
			{
				key: "username",
				className: "username",
				text: "Username",
				sortable: true,
			},
			{
				key: "level",
				className: "level",
				text: "Level",
				sortable: true,
			},
			{
				key: "action",
				className: "action",
				text: "Action",
				cell: (record, index) => {
					return(
						<div className="d-flex">
							<button
								className="btn btn-success btn-md"
								data-target="#modalEdit" data-toggle="modal"
								onClick={() => {this.editUsers(record.id_users)}}
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
			users: [],
			dataUsers: {
				id_users:"",
				username:"",
				password:"",
			},
			errorsEdit: {
				username: "",
			},
			status: "",
			message: "",
		}
	}

	componentDidMount() {
		this.getUsers();
	}

	getUsers() {
		axios.get(`http://${window.location.host}/api/users`)
		.then((response) => {
			this.setState({
				users: response.data.data ? response.data.data : [], 
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

	editUsers = (id_users) => {
		axios.get(`http://${window.location.host}/api/where-users/${id_users}`)
		.then((response)=>{
			this.setState({
				dataUsers: {
					id_users: response.data.data.id_users,
					username: response.data.data.username,
					password: "",
				}, errorsEdit: {
					username: "",
					password: "",
				}
			})
		})
	}

	onChangeEditHandler = (e) => {
		let {dataUsers, errorsEdit} = this.state;
		errorsEdit[e.target.name] = "";
		dataUsers[e.target.name] = e.target.value;
		this.setState({dataUsers});
	}

	updateUsers = () => {

		let {dataUsers, errorsEdit} = this.state;

		if(dataUsers.username == "") {
			errorsEdit.username = "Username Harus Diisi";
		}

		if(errorsEdit.username) {
			this.setState({errorsEdit})
		} else {
			axios.post(`http://${window.location.host}/api/update-users`, dataUsers)
			.then((response)=>{
				this.setState({
					status: response.data.status,
					message: response.data.message,
				}, () => this.getUsers())
			})
		}
	}

	render() {

		const {users, dataUsers, status, message, errorsEdit} = this.state;

		let sendMessage = "";
		if(status == 200) {
			sendMessage = <div className="alert alert-success" role="alert">{message}</div>
		} else if(status == "failed") {
			sendMessage = <div className="alert alert-danger" role="alert">{message}</div>
		} else {
			sendMessage = "";
		}

		if(localStorage.level != 'Administrator') {
			return <Redirect to="/home"/>
		}

		return(
			<div>
				<div className="card bg-dark mb-2">
					<div className="card-header">
						<h3>Data User</h3>
					</div>
					<EditUsers
						editUsers={dataUsers}
						onChangeEditHandler={this.onChangeEditHandler}
						updateUsers={this.updateUsers}
						errorsEdit={errorsEdit}
					/>
					<div className="card-body">
						{sendMessage}
						<ReactDatatable 
							className = "table table-dark table-bordered"
							columns = {this.columns}
							config = {this.config}
							records = {users}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default User;