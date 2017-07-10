import React from 'react'

export default class ShowBooks extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			<h1><strong>Libro {this.props.book.id}</strong></h1>
			<hr/>
				<h1>Titulo: {this.props.book.title}</h1>
				<h1>Autor: {this.props.book.author}</h1>
				<h1>Descripcion: {this.props.book.description}</h1>
				<h1>Genero: {this.props.book.kind}</h1>

				<a href={"/books/"}><button className="btn btn-info">Volver a la pagina principal</button></a>
			</div>
			)
	}
}