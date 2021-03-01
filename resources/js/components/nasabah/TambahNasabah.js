import React, {Component, Fragment} from 'react';

class TambahNasabah extends React.Component {
	render() {
		return(
			<div>
				<button className="btn btn-primary" data-toggle="modal" data-target="#modalTambah">Tambah Nasabah
				</button>
				<div className="modal fade" id="modalTambah" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  	<div className="modal-dialog">
				    	<div className="modal-content">
				      		<div className="modal-header">
				        		<h5 className="modal-title text-dark font-weigth-bold" id="exampleModalLabel">Tambah Data Nasabah</h5>
				      		</div>
				      		<div className="modal-body">
				        		<div className="form-group">
				        			<label htmlFor="nm_nasabah" className="text-dark">Nama Nasabah</label>
				        			<input 
				        				className="form-control" 
				        				placeholder="Nama Nasabah"
				        				name="nm_nasabah"
				        				value={this.props.dataNasabahBaru.nm_nasabah}
				        				onChange={this.props.onChangeHandler}/>
				        		</div>
				        		<div className="form-group">
				        			<div className="d-flex">
				        				<div className="form-check mr-3">
					        				<input
						        				type="radio"
						        				name="jk"
						        				className="form-check-input"
						        				value="L"
						        				onChange={this.props.onChangeHandler}/>
						        			<label className="form-check-label text-dark">Laki-Laki</label>
					        			</div>
					        			<div className="form-check">
						        			<input
						        				type="radio"
						        				name="jk"
						        				className="form-check-input"
						        				value="P"
						        				onChange={this.props.onChangeHandler}/>
						        			<label className="form-check-label text-dark">Perempuan</label>
					        			</div>
				        			</div>
				        			<div className="form-group">
					        			<label htmlFor="no_hp" className="text-dark">E-mail</label>
					        			<input 
					        				className="form-control" 
					        				placeholder="example@example.com"
					        				name="email"
					        				value={this.props.dataNasabahBaru.email}
					        				onChange={this.props.onChangeHandler}/>
					        		</div>
				        			<div className="form-group">
					        			<label htmlFor="no_hp" className="text-dark">No Handphone/Telephone</label>
					        			<input 
					        				className="form-control" 
					        				placeholder="089xxxxxxxx"
					        				name="no_hp"
					        				maxLength="12"
					        				value={this.props.dataNasabahBaru.no_hp}
					        				onChange={this.props.onChangeHandler}/>
					        		</div>
					        		<div className="form-group">
					        			<label htmlFor="no_hp" className="text-dark">Alamat</label>
					        			<textarea 
					        				className="form-control" 
					        				placeholder="Silahkan Isi Alamat Anda"
					        				name="alamat"
					        				value={this.props.dataNasabahBaru.alamat}
					        				onChange={this.props.onChangeHandler}>
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
				        			onClick={()=>this.props.tambahNasabah()}
				        		>
				        			Simpan
				        		</button>
				      		</div>
				    	</div>
				  	</div>
				</div>
			</div>
		);
	}
}

export default TambahNasabah;