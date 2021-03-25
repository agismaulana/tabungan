import React, {Component} from 'react';

class EditUsers extends Component {
	render() {
		return(
			<div>
				<div className="modal fade" id="modalEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  	<div className="modal-dialog">
				    	<div className="modal-content bg-dark">
				      		<div className="modal-header">
				        		<h5 className="modal-title font-weigth-bold" id="exampleModalLabel">Edit Data Users</h5>
				      		</div>
				      		<div className="modal-body">
				        		<div className="form-group">
				        			<label htmlFor="nm_nasabah">Username</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="Username"
				        				name="username"
				        				value={this.props.editUsers.username}
				        				onChange={this.props.onChangeEditHandler}/>
				        		</div>
			        			<div className="form-group">
				        			<label htmlFor="no_hp">Password</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				type="password"
				        				placeholder="**********"
				        				name="password"
				        				value={this.props.editUsers.password}
				        				onChange={this.props.onChangeEditHandler}/>
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
				        			onClick={()=>this.props.updateUsers()}
				        			data-dismiss="modal"
				        		>
				        			Simpan
				        		</button>
				      		</div>
				    	</div>
				  	</div>
				</div>
			</div>
		)
	}
}

export default EditUsers;