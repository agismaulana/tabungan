import React, {Component} from 'react';

class EditPegawai extends Component {
	render() {
		return(
			<div>
				<div className="modal fade" id="modalEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  	<div className="modal-dialog">
				    	<div className="modal-content">
				      		<div className="modal-header">
				        		<h5 className="modal-title text-dark font-weigth-bold" id="exampleModalLabel">Tambah Data Pegawai</h5>
				      		</div>
				      		<div className="modal-body">
				        		<div className="form-group">
				        			<label htmlFor="nm_nasabah" className="text-dark">Nama Pegawai</label>
				        			<input 
				        				className="form-control" 
				        				placeholder="Nama Nasabah"
				        				name="nm_pegawai"
				        				value={this.props.editPegawai.nm_pegawai}
				        				onChange={this.props.onChangeEditHandler}
				        			/>
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
						        			<label className="form-check-label text-dark">Laki-Laki</label>
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
						        			<label className="form-check-label text-dark">Perempuan</label>
					        			</div>
				        			</div>
				        			<div className="form-group">
					        			<label htmlFor="no_hp" className="text-dark">E-mail</label>
					        			<input 
					        				className="form-control" 
					        				placeholder="example@example.com"
					        				name="email"
					        				value={this.props.editPegawai.email}
					        				onChange={this.props.onChangeEditHandler}/>
					        		</div>
				        			<div className="form-group">
					        			<label htmlFor="no_hp" className="text-dark">No Handphone/Telephone</label>
					        			<input 
					        				className="form-control" 
					        				placeholder="089xxxxxxxx"
					        				name="no_hp"
					        				maxLength="12"
					        				value={this.props.editPegawai.no_hp}
					        				onChange={this.props.onChangeEditHandler}/>
					        		</div>
					        		<div className="form-group">
					        			<label htmlFor="no_hp" className="text-dark">Alamat</label>
					        			<textarea 
					        				className="form-control" 
					        				placeholder="Silahkan Isi Alamat Anda"
					        				name="alamat"
					        				value={this.props.editPegawai.alamat}
					        				onChange={this.props.onChangeEditHandler}>
					        			</textarea>
					        		</div>
				        		</div>
				      		</div>
				      		<div className="modal-footer">
				        		<button 
				        			type="button" 
				        			className="btn btn-secondary" 
				        			data-dismiss="modal"
				        		>
				        			Close
				        		</button>
				        		<button 
				        			type="button" 
				        			className="btn btn-primary" 
				        			onClick={()=>this.props.updatePegawai()}
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

export default EditPegawai;