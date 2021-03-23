import React, {Component} from 'react';


import {
	faUserEdit,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class EditProfile extends Component {
	render() {
		return(
			<div>
				<button className="btn btn-primary" data-toggle="modal" data-target="#editProfile">
					<FontAwesomeIcon icon={faUserEdit} /> Ubah Profile
				</button>

				<div className="modal fade" id="editProfile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  	<div className="modal-dialog">
				    	<div className="modal-content bg-dark">
				      		<div className="modal-header">
				        		<h5 className="modal-title font-weigth-bold" id="exampleModalLabel">Edit Data Nasabah</h5>
				      		</div>
				      		<div className="modal-body">
				        		<div className="form-group">
				        			<label htmlFor="nm_nasabah">Nama Lengkap</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="Nama Lengkap"
				        				name="nm_users"
				        				value={this.props.dataUsers.nm_users}
				        				onChange={this.props.onChangeEditHandler}/>
				        		</div>
				        		<div className="form-group">
				        			<label htmlFor="no_hp">E-mail</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="example@example.com"
				        				name="email"
				        				value={this.props.dataUsers.email}
				        				onChange={this.props.onChangeEditHandler}/>
				        		</div>
			        			<div className="form-group">
				        			<label htmlFor="no_hp">No Handphone/Telephone</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="089xxxxxxxx"
				        				name="no_hp"
				        				maxLength="12"
				        				value={this.props.dataUsers.no_hp}
				        				onChange={this.props.onChangeEditHandler}/>
				        		</div>
				        		<div className="form-group">
				        			<div className="d-flex">
				        				<div className="form-check mr-3">
					        				<input
						        				type="radio"
						        				name="jk"
						        				className="form-check-input"
						        				value="Laki-Laki"
						        				onChange={this.props.onChangeEditHandler}
						        				checked={this.props.dataUsers.jk == 'Laki-Laki' ? 'checked' : ''}
						        			/>
						        			<label className="form-check-label">Laki-Laki</label>
					        			</div>
					        			<div className="form-check">
						        			<input
						        				type="radio"
						        				name="jk"
						        				className="form-check-input"
						        				value="Perempuan"
						        				onChange={this.props.onChangeEditHandler}
						        				checked={this.props.dataUsers.jk == 'Perempuan' ? 'checked' : ''}/>
						        			<label className="form-check-label">Perempuan</label>
					        			</div>
				        			</div>
				        		</div>
				        		<div className="form-group">
				        			<label htmlFor="no_hp">Alamat</label>
				        			<textarea 
				        				className="form-control bg-dark text-white" 
				        				placeholder="Silahkan Isi Alamat Anda"
				        				name="alamat"
				        				value={this.props.dataUsers.alamat}
				        				onChange={this.props.onChangeEditHandler}>
				        			</textarea>
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
				        			onClick={()=>this.props.updateProfile()}
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

export default EditProfile;