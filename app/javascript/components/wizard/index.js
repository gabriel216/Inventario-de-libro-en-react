import React from 'react'
import FormBook from './../form_book'
import ShowBook from './../show_books'
import EditBook from './../edit_book'

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
    this.handleShow = this.handleShow.bind(this);

  }

  handleShow(e){
    const id = e.target.id
    let books = [...this.state.books];
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
    fetch('/books/' + id, options)
      .then((r) => r.json())
      .then((r) => {
        if (r.status == 200)
          this.setState({books});
      })
      .catch((r)=>{
        console.log(r);
      })

  }

  onInputChange(e) {
    let book = this.state.book;
    book[e.target.name] = e.target.value;
    this.setState({ book });
  }

  handleSubmit() {
    const token = this.props.token;
    const { book } = this.state;
    let headers = new Headers({
      "Content-Type": "application/json",
      'X-CSRF-Token': token
    })
    let options = {
      method: "POST",
      headers,
      credentials: 'same-origin',
      body: JSON.stringify({ book: book })
    }
    fetch('/books', options)
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        if (r.status == 200) {
          if (book.title != '' && book.author != '' && book.description != '' && book.kind != '') {
            let newBook = {
              title: book.title,
              author: book.author,
              description: book.description,
              kind: book.kind,
              id:r.id
            };
            let books = [...this.state.books, newBook];
            this.setState( {books} );
          } else {
            alert('Debe rellenar todos los campos del formulario para agregar el libro ')
            return false
            }
          }
          
      })
      .catch((r) => {
        console.log(r);
      })
  }

  render() {
    return (
      <div>
        <FormBook handleSubmit={this.handleSubmit} onInputChange={this.onInputChange} />
        {this.state.books.map((book, index) =>
          <div key={index}>
            <h1>Titulo:{book.title}</h1>
            <p>Autor:{book.author}</p>
            <p>Descripcion:{book.description}</p>
            <p>Genero:{book.kind}</p>
            <button id={book.id} onClick={this.handleDelete} className="btn btn-danger">Borrar libro de la lista</button>
            <a  href={"/books/" + book.id + "/edit"}><button type="button" className="btn btn-warning">Editar</button></a>
            <a href={"/books/" + book.id }><button type="button" className="btn btn-primary" >Ver el libro</button></a>
          </div>
        )}
      </div>
    )
  }
}

export default Wizard
