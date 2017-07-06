import React from 'react'

class FormBook extends React.Component {
	constructor(props) {
		super(props);

	}

	render () {
		return (
			<div>
				<input onChange={this.props.onInputChange} name="title" placeholder="title" type="text"/>
				<input onChange={this.props.onInputChange} name="author" placeholder="author" type="text"/>
				<input onChange={this.props.onInputChange} name="description" placeholder="description" type="text"/>
				<input onChange={this.props.onInputChange} name="kind" placeholder="kind" type="text"/>
				<button onClick={this.props.handleSubmit}>Submit</button>
			</div>
			);
	}
 } 

 export default FormBook