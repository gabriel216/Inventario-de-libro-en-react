import React from 'react'

class EditBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			book: Object.assign({}, this.props.book)
		}	

		this.handleEdit = this.handleEdit.bind(this);
		this.handleChange = this.handleChange.bind(this);

	}

	handleChange(e) {
    let book = this.state.book;
    book[e.target.name] = e.target.value;
    this.setState({ book });
	}

handleEdit(e) {

    const token = (this.props.token)
    const book = this.state.book
		       
    let headers = new Headers({
      "Content-Type": "application/json",
      'X-CSRF-Token': token
    })
    let options = {
      method: "PUT",
      headers,
      credentials: 'same-origin',
      body: JSON.stringify({ book: book })
    }
    fetch('/books/' + book.id, options)
      .then((r) => r.json())
      .then((r) => {
				window.location.href = "/books/" + book.id     
				 })
      .catch((r)=>{
        console.log(r);
      })

} 

	render() {
		return (
			<div>
			<h1><strong>Libro:</strong> {this.props.book.title}</h1>
			<hr/>
				<input className="form-control" onChange={this.handleChange} name="title" placeholder="title" type="text"/>
				<input className="form-control" onChange={this.handleChange} name="author" placeholder="author" type="text"/>
				<input className="form-control" onChange={this.handleChange} name="description" placeholder="description" type="text"/>
				<input className="form-control" onChange={this.handleChange} name="kind" placeholder="kind" type="text"/>
			<button onClick={this.handleEdit} className="btn btn-success btn-lg">Guardar cambios</button>						
			</div>
			)
	}
}


export default EditBook 