import React, {Component} from 'react';

class EditPegawai extends Component {
	render() {
		return(
			<div>
				<div className="modal fade" id="modalEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  	<div className="modal-dialog">
				    	<div className="modal-content bg-dark">
				      		<div className="modal-header">
				        		<h5 className="modal-title font-weigth-bold" id="exampleModalLabel">Edit Data Pegawai</h5>
				      		</div>
				      		<div className="modal-body">
				        		<div className="form-group">
				        			<label htmlFor="nm_nasabah">Nama Pegawai</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="Nama Nasabah"
				        				name="nm_pegawai"
				        				value={this.props.editPegawai.nm_pegawai}
				        				onChange={this.props.onChangeEditHandler}
				        			/>
				        			<span className="text-danger">{this.props.errorsEdit.nm_pegawai}</span>
				        		</div>
				        		<div className="form-group">
				        			<label htmlFor="no_hp">E-mail</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="example@example.com"
				        				name="email"
				        				value={this.props.editPegawai.email}
				        				onChange={this.props.onChangeEditHandler}/>
				        			<span className="text-danger">{this.props.errorsEdit.email}</span>
				        		</div>
			        			<div className="form-group">
				        			<label htmlFor="no_hp">No Handphone/Telephone</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="089xxxxxxxx"
				        				name="no_hp"
				        				maxLength="12"
				        				value={this.props.editPegawai.no_hp}
				        				onChange={this.props.onChangeEditHandler}/>
				        			<span className="text-danger">{this.props.errorsEdit.no_hp}</span>
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
						        				checked={this.props.editPegawai.jk == "Laki-Laki" ? 'checked' : ''}
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
						        				checked={this.props.editPegawai.jk == "Perempuan" ? 'checked' : ''}
						        			/>
						        			<label className="form-check-label">Perempuan</label>
					        			</div>
				        			</div>
				        			<span className="text-danger">{this.props.errorsEdit.jk}</span>
				        		</div>
				        		<div className="form-group">
				        			<label htmlFor="no_hp">Alamat</label>
				        			<textarea 
				        				className="form-control bg-dark text-white" 
				        				placeholder="Silahkan Isi Alamat Anda"
				        				name="alamat"
				        				value={this.props.editPegawai.alamat}
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
				        			onClick={()=>this.props.updatePegawai()}
				        			data-dismiss={
				        				this.props.editPegawai.nm_pegawai != ""
				        				&& this.props.editPegawai.email != ""
				        				&& this.props.editPegawai.no_hp != ""
				        				&& this.props.editPegawai.jk != ""
				        				? "modal" : ""
				        			}
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

export default EditPegawai;