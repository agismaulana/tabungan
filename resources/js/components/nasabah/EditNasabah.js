import React, {Component} from "react";

class EditNasabah extends Component {
	render() {
		return(
			<div>
				<div className="modal fade" id="modalEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  	<div className="modal-dialog">
				    	<div className="modal-content bg-dark">
				      		<div className="modal-header">
				        		<h5 className="modal-title font-weigth-bold" id="exampleModalLabel">Edit Data Nasabah</h5>
				      		</div>
				      		<div className="modal-body">
				        		<div className="form-group">
				        			<label htmlFor="nm_nasabah">Nama Nasabah</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="Nama Nasabah"
				        				name="nm_nasabah"
				        				value={this.props.editNasabah.nm_nasabah}
				        				onChange={this.props.onChangeEditHandler}/>
				        			<span className="text-danger">
				        				{this.props.errorsEdit.nm_nasabah}
				        			</span>
				        		</div>
				        		<div className="form-group">
				        			<label htmlFor="no_hp">E-mail</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="example@example.com"
				        				name="email"
				        				value={this.props.editNasabah.email}
				        				onChange={this.props.onChangeEditHandler}/>
				        			<span className="text-danger">
				        				{this.props.errorsEdit.email}
				        			</span>
				        		</div>
			        			<div className="form-group">
				        			<label htmlFor="no_hp">No Handphone/Telephone</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="089xxxxxxxx"
				        				name="no_hp"
				        				maxLength="12"
				        				value={this.props.editNasabah.no_hp}
				        				onChange={this.props.onChangeEditHandler}/>
				        			<span className="text-danger">
				        				{this.props.errorsEdit.no_hp}
				        			</span>
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
						        				checked={this.props.editNasabah.jk == 'Laki-Laki' ? 'checked' : ''}
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
						        				checked={this.props.editNasabah.jk == 'Perempuan' ? 'checked' : ''}/>
						        			<label className="form-check-label">Perempuan</label>
					        			</div>
				        			</div>
				        			<span className="text-danger">
				        				{this.props.errorsEdit.jk}
				        			</span>
				        		</div>
				        		<div className="form-group">
				        			<label htmlFor="no_hp">Alamat</label>
				        			<textarea 
				        				className="form-control bg-dark text-white" 
				        				placeholder="Silahkan Isi Alamat Anda"
				        				name="alamat"
				        				value={this.props.editNasabah.alamat}
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
				        			onClick={()=>this.props.updateNasabah()}
				        			data-dismiss= {
				        				this.props.editNasabah.nm_nasabah != ""
				        				&& this.props.editNasabah.email != ""
				        				&& this.props.editNasabah.no_hp != ""
				        				&& this.props.editNasabah.jk != ""
				        				? 'modal' : ''
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

export default EditNasabah;