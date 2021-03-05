import React, {Component} from 'react';

class TambahPegawai extends Component {
	render() {
		return(
			<div>
				<button className="btn btn-primary" data-target="#modalTambah" data-toggle="modal">
					Tambah Data Pegawai
				</button>

				<div className="modal fade" id="modalTambah" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  	<div className="modal-dialog col-md-12">
				    	<div className="modal-content bg-dark">
				      		<div className="modal-header">
				        		<h5 className="modal-title font-weigth-bold" id="exampleModalLabel">Tambah Data Pegawai</h5>
				      		</div>
				      		<div className="modal-body">
				        		<div className="d-flex justify-content-between">
			        				<div className="form-group">
			        					<label htmlFor="username">Username</label>
			        					<input 
			        						type="text"
			        						className="form-control bg-dark text-white"
			        						placeholder="e.g.JohnDoe"
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
			        						placeholder="***********"
			        						name="password"
			        						value={this.props.dataUsersBaru.password}
			        						onChange={this.props.onChangeHandler}
			        					/>
			        				</div>
			        			</div>
			        			<div className="form-group">
				        			<label htmlFor="nm_nasabah">Nama Pegawai</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="Nama Nasabah"
				        				name="nm_pegawai"
				        				value={this.props.dataPegawaiBaru.nm_pegawai}
				        				onChange={this.props.onChangeHandler}
				        			/>
				        		</div>
			        			<div className="form-group">
				        			<label htmlFor="no_hp">E-mail</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="example@example.com"
				        				name="email"
				        				value={this.props.dataPegawaiBaru.email}
				        				onChange={this.props.onChangeHandler}/>
				        		</div>
			        			<div className="form-group">
				        			<label htmlFor="no_hp">No Handphone/Telephone</label>
				        			<input 
				        				className="form-control bg-dark text-white" 
				        				placeholder="089xxxxxxxx"
				        				name="no_hp"
				        				maxLength="12"
				        				value={this.props.dataPegawaiBaru.no_hp}
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
						        				checked={this.props.dataPegawaiBaru.jk == "Laki-Laki" ? 'checked' : ''}
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
						        				checked={this.props.dataPegawaiBaru.jk == "Perempuan" ? 'checked' : ''}
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
				        				value={this.props.dataPegawaiBaru.alamat}
				        				onChange={this.props.onChangeHandler}>
				        			</textarea>
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
				        			onClick={()=>this.props.tambahPegawai()}
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

export default TambahPegawai;