import React, {Component, Fragment} from 'react';

class TambahNasabah extends React.Component {
	render() {
		return(
			<div>
				<button className="btn btn-primary" data-toggle="modal" data-target="#modalTambah">Tambah Nasabah
				</button>
				<div className="modal fade" id="modalTambah" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  	<div className="modal-dialog">
				    	<div className="modal-content bg-dark">
				      		<div className="modal-header">
				        		<h5 className="modal-title font-weigth-bold" id="exampleModalLabel">Tambah Data Nasabah</h5>
				      		</div>
				      		<div className="modal-body">
				      			<div className="d-flex justify-content-between">
				      				<div className="form-group">
				      					<label htmlFor="username">Username</label>
					        			<input 
					        				type="text"
					        				className="form-control bg-dark text-white" 
					        				placeholder="Username"
					        				name="username"
					        				value={this.props.dataUsersBaru.username}
					        				onChange={this.props.onChangeHandler}
					        			/>	
				      				</div>
				      				<div className="form-group">
				      					<label htmlFor="password">Password</label>
					        			<input 
					        				type="password"
					        				className="form-control bg-dark text-white" 
					        				placeholder="*********"
					        				name="password"
					        				value={this.props.dataUsersBaru.password}
					        				onChange={this.props.onChangeHandler}
					        			/>	
				      				</div>
				      			</div>
				        		<div className="form-group">
				        			<label htmlFor="nm_nasabah">Nama Nasabah</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="Nama Nasabah"
				        				name="nm_nasabah"
				        				value={this.props.dataNasabahBaru.nm_nasabah}
				        				onChange={this.props.onChangeHandler}
				        			/>
				        		</div>
				        		<div className="form-group">
				        			<label htmlFor="no_hp">E-mail</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="example@example.com"
				        				name="email"
				        				value={this.props.dataNasabahBaru.email}
				        				onChange={this.props.onChangeHandler}/>
				        		</div>
			        			<div className="form-group">
				        			<label htmlFor="no_hp">No Handphone/Telephone</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="089xxxxxxxx"
				        				name="no_hp"
				        				maxLength="12"
				        				value={this.props.dataNasabahBaru.no_hp}
				        				onChange={this.props.onChangeHandler}/>
				        		</div>
				        		<div className="form-group">
				        			<div className="d-flex">
				        				<div className="form-check mr-3">
					        				<input
						        				type="radio"
						        				name="jk"
						        				className="form-check-input"
						        				value="Laki-Laki"
						        				onChange={this.props.onChangeHandler}
						        				checked={this.props.dataNasabahBaru.jk == "Laki-Laki" ? 'checked' : ''}
						        			/>
						        			<label className="form-check-label">Laki-Laki</label>
					        			</div>
					        			<div className="form-check">
						        			<input
						        				type="radio"
						        				name="jk"
						        				className="form-check-input"
						        				value="Perempuan"
						        				onChange={this.props.onChangeHandler}
						        				checked={this.props.dataNasabahBaru.jk == "Perempuan" ? 'checked' : ''}
						        			/>
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
				        				value={this.props.dataNasabahBaru.alamat}
				        				onChange={this.props.onChangeHandler}>
				        			</textarea>
				        		</div>
				        		<div className="form-group">
				        			<label htmlFor="pin">Pin Rekening</label>
				        			<input 
				        				type="password"
				        				className="form-control bg-dark text-white" 
				        				placeholder="*******"
				        				name="pin"
				        				maxLength="12"
				        				value={this.props.dataUsersBaru.pin}
				        				onChange={this.props.onChangeHandler}/>
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
				        			data-dismiss="modal"
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