import React, {Component} from 'react';

class Transaksi extends Component {
	render() {
		let opsiTransaksi = "";
		if(this.props.dataTransaksi.jenis_transaksi == "Tarik" || this.props.dataTransaksi.jenis_transaksi == "Setor") {
			opsiTransaksi = <div className="form-group">
			        			<label htmlFor="nominal">Nominal</label>
			        			<input 
			        				className="form-control bg-dark text-white" 
			        				placeholder="nominal"
			        				name="nominal"
			        				value={this.props.dataTransaksi.nominal}
			        				onChange={this.props.onChangeTransaksiHandler}/>
			        		</div>;
		} else {
			opsiTransaksi = "";
		}

		return(
			<div>
				<div className="modal fade" id="modalTransaksi" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  	<div className="modal-dialog col-md-12">
				    	<div className="modal-content bg-dark">
				      		<div className="modal-header">
				        		<h5 className="modal-title font-weigth-bold" id="exampleModalLabel">Transaksi</h5>
				      		</div>
				      		<div className="modal-body">
		        				<div className="form-group">
		        					<label htmlFor="no_rekening">No Rekening</label>
		        					<input 
		        						type="text"
		        						className="form-control bg-dark text-white"
		        						placeholder="9875432123456789"
		        						name="no_rekening"
		        						value={this.props.dataTransaksi.no_rekening}
		        						onChange={this.props.onChangeTransaksiHandler}
		        						readOnly
		        					/>
		        				</div>
		        				<div className="form-group">
		        					<label htmlFor="nm_nasabah">Nama Nasabah</label>
		        					<input 
		        						type="text"
		        						className="form-control bg-dark text-white"
		        						placeholder="Nama Nasabah"
		        						name="nm_nasabah"
		        						value={this.props.dataTransaksi.nm_nasabah}
		        						onChange={this.props.onChangeTransaksiHandler}
		        						readOnly
		        					/>
		        				</div>
				        		<div className="form-group">
				        			<div className="d-flex">
				        				<div className="form-check mr-3">
					        				<input
						        				type="radio"
						        				name="jenis_transaksi"
						        				className="form-check-input"
						        				value="Setor"
						        				onChange={this.props.onChangeTransaksiHandler}
						        				checked={this.props.dataTransaksi.jenis_transaksi == "Setor" ? 'checked' : ''}
						        			/>
						        			<label className="form-check-label">Setor</label>
					        			</div>
					        			<div className="form-check mr-3">
						        			<input
						        				type="radio"
						        				name="jenis_transaksi"
						        				className="form-check-input"
						        				value="Tarik"
						        				onChange={this.props.onChangeTransaksiHandler}
						        				checked={this.props.dataTransaksi.jenis_transaksi == "Tarik" ? 'checked' : ''}
						        			/>
						        			<label className="form-check-label">Tarik</label>
					        			</div>
				        			</div>
				        		</div>
				        		{opsiTransaksi}
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
				        			onClick={()=>this.props.handleTransaksi()}
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

export default Transaksi;