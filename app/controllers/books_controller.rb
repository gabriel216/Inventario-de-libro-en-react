class BooksController < ApplicationController
  def index
    @books = Book.all
  end

  def new
    @book = Book.new
  end

  def create
    @book = Book.new(book_params)
    if @book.save
      render json: {status: 200, message:"ok"}
    else
      render json: {status: 400, message:"bad request"}
    end    
  end

  def destroy
    @book = Book.find_by(id: params[:id])
    if @book.destroy
      render json: { status: 200 }
    else
      render json: { status: 400 }
    end
  end

  def edit
    @book = Book.find_by(id: params[:id])
  end

  def show
    @book = Book.find_by(id: params[:id])
  end

  private 

    def book_params
      params.require(:book).permit(:title, :author, :description, :kind)    
    end

end
