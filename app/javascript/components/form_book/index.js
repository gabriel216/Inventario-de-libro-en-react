import React from 'react'

 class FormBook extends React.Component {
	constructor(props) {
		super(props);

	}

	render () {
		return (
			<div className="row">
				<div className="col-xs-12">
					<div>
						<input ref="book_title" className="form-control" onChange={this.props.onInputChange} name="title" placeholder="title" type="text"/>
						<input className="form-control" onChange={this.props.onInputChange} name="author" placeholder="author" type="text"/>
						<input className="form-control" onChange={this.props.onInputChange} name="description" placeholder="description" type="text"/>
						<input className="form-control" onChange={this.props.onInputChange} name="kind" placeholder="kind" type="text"/>
						<button onClick={this.props.handleSubmit} className="btn btn-success btn-lg">Agregar libro al inventario</button>						
						<hr/>
					</div>
				</div>
			</div>

			);
	}
 } 

 export default FormBook

