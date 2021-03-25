import React, {Component} from 'react';

class EditRekening extends Component {
	render() {
		return(
			<div>
				<div className="modal fade" id="modalEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
		        						value={this.props.editRekening.no_rekening}
		        						onChange={this.props.onChangeEditHandler}
		        						readOnly
		        					/>
		        				</div>
		        				<div className="form-group">
		        					<label htmlFor="pin">Pin Lama</label>
		        					<input 
		        						type="password"
		        						className="form-control bg-dark text-white"
		        						placeholder="*******"
		        						name="pin_lama"
		        						value={this.props.editRekening.pin_lama}
		        						onChange={this.props.onChangeEditHandler}
		        					/>
		        				</div>
		        				<div className="form-group">
		        					<label htmlFor="pin">Pin Baru</label>
		        					<input 
		        						type="password"
		        						className="form-control bg-dark text-white"
		        						placeholder="*******"
		        						name="pin_baru"
		        						value={this.props.editRekening.pin_baru}
		        						onChange={this.props.onChangeEditHandler}
		        					/>
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
				        			onClick={()=>this.props.updateRekening()}
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

export default EditRekening; 