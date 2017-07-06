import React from 'react'
import FormBook from './../form_book'

class Wizard extends React.Component {

 	constructor(props) {
 		super(props);
 		this.state = {
 			books: props.books,
 			book: {
 				title: '',
 				author: '',
 				description: '',
 				kind: ''
 			}
 		}

 		this.handleSubmit = this.handleSubmit.bind(this);
 		this.onInputChange = this.onInputChange.bind(this);
 		this.handleDelete = this.handleDelete.bind(this);
 	}

onInputChange(e) {
	let book = this.state.book;
	book[e.target.name] = e.target.value
	this.setState({ book })
}

handleDelete(e) {
    const token = this.props.token;
    const id = e.target.id
    let books = [...this.state.books];
    books = books.filter((item) => {
      if(item.id != id)
        return item;
    })
    let headers = new Headers({
      "Content-Type": "application/json",
      'X-CSRF-Token': token
    })
    let options = {
      method: "DELETE",
      headers,
      credentials: 'same-origin'
    }
    fetch("/books" + id, options)
      .then((r) => r.json())
      .then((r) => {
        if (r.status == 200)
          this.setState(books);
      })
      .catch((r)=>{
        console.log(r);
      })
 
  }
 


	handleSubmit() {
		const token = this.props.token;
		const book = this.state.book;

		let headers = new Headers({
      "Content-Type": "application/json",
      'X-CSRF-Token': token
    })
    let options = {
      method: "POST",
      headers,
      credentials: 'same-origin',
      body: JSON.stringify({book: book})
    }
    fetch('/books', options)
    	.then((r) => {
    		return r.json();
    	})
    	.then((r) => {
    		if(r.status == 200){
    			let newBook = {
    				title: book.title,
    				author: book.author,
    				description: book.description,
    				kind: book.kind
    			}
    			let books = [...this.state.books, newBook];
    			this.setState(books);	
    		}
    	})
    .catch(() => {
    	console.log('ERROR!');
    }
    
    )  	
  }  

render() {
	return (
		<div>
			<FormBook handleSubmit={this.handleSubmit}  onInputChange={this.onInputChange}/>
				{this.state.books.map((book, index)=> 
					<div key={index}>
						<h1>Titulo:{book.title}</h1>
						<p>Autor:{book.author}</p>
						<p>Descripcion:{book.description}</p>
						<p>Genero:{book.kind}</p>
						<button onClick={this.handleDelete} id={book.id}>Borrar</button>
					</div>
		)}
		</div>		
		);
	}
}

export default Wizard;

 
  