import React from 'react';
import './App.css';
import * as ShelfApi from './BooksAPI.js';
import {Link} from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';

function ShelfBooks({Contacts,origin}){
  const shelves =[
  {id:1,shelfName:"currentlyReading",shelfDisplayName:"Currently Reading"},
  {id:2,shelfName:"wantToRead",shelfDisplayName:"Want To Read"},
  {id:3,shelfName:"read",shelfDisplayName:"Read"}]

  let newone = async (event,book,c,shelves) =>{

   book.shelf = event.target.value;

    c= c.map((old) =>{
      if( old.id === book.id){return book}
      else{return old}
    })
   
   console.log(c);
   //update(c);
    await ShelfApi.update(book,book.shelf);
    origin(c);

  }

return (
   <div className="list-books">
       <div className="list-books-title">

        <h1>MyReads</h1>

         </div>

          <div className="list-books-content"> 

          <div className="bookshelf">
          {shelves.map((shelf)=>{
            return (<div key={shelf.id}>
             <h2   className="bookshelf-title">{shelf.shelfDisplayName}</h2>
             <div   className="bookshelf-books">
             <ol  className="books-grid">
             {Contacts.filter((book)=> book.shelf === shelf.shelfName).map((book)=>{
              return (
                <li key={book.id}>
                <Book  book={book} Contacts={Contacts} shelves={shelves} send={newone}/>

                </li>
                )
             })}
             </ol>
            
      </div>
       </div>

        )})}
          </div>
          </div>
           
          <div className="open-search">
            <Link to ="/search"></Link>
          </div>
          </div>

          
);
}

ShelfBooks.propTypes={
  Contacts : PropTypes.array.isRequired,
  origin : PropTypes.func.isRequired,
  
}


export default ShelfBooks;