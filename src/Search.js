import React from 'react';
import {useState } from 'react';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as ShelfApi from './BooksAPI.js';
import './App.css';
import PropTypes from 'prop-types';
function Search({Contacts,origin}){

	const [query , setquery] = useState(' ');

	const [books , edit] = useState([]);

useEffect( ()=>{
	let bool = true;
	let call = async ()=>{
		const y = await ShelfApi.search(query);
		if(bool){
			if(Array.isArray(y)){
            edit(y);
        }
        else{edit(' ')}
	}


}
call();

return ()=>{
	bool = false;
}
},[query])
	


	return(
		 <div>

         <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">
      
            </Link>
            
            <div className="search-books-input-wrapper">
              <input onChange={(e)=> {if(e.target.value ===''){setquery(' ')} else{setquery(e.target.value)}} }type="text"placeholder="Search by title, author, or ISBN"></input>
            </div>
          </div>
          </div>



          
          
          <div className="search-books-results">
            <ol className="books-grid">
            {Array.isArray(books)  &&(
            	books.filter((item)=>{return item.imageLinks !== undefined}).map((book)=>{
            		
                  return(
            		
            		
                         <li key={book.id}>
                      <div className="book">
                      <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                `url(${book.imageLinks.thumbnail})`,
                            }}
                          ></div>


          <div className="book-shelf-changer">

            <select value={ Contacts.find((c)=> c.id === book.id) !== undefined ? Contacts.find((c)=> c.id === book.id).shelf : 'none'} onChange={(e)=>{
              book.shelf = e.target.value;
              let found = Contacts.find((item)=> item.id === book.id);
              if(found !== undefined ){
              	found.shelf = book.shelf;
              }
              else{
              	Contacts.push(book);
              }
              let callit = async ()=>{
              await ShelfApi.update(book,book.shelf);
              origin(Contacts);
          }
          callit();

            }}>
               <option value="none2" disabled>
                  Move to...
                </option>
                              
                <option value="currentlyReading">
                   Currently Reading
                 </option>
                              
                 <option   value="wantToRead"> Want to Read</option>
                             
                 <option  value="read">Read</option>
                 
                 <option value="none">None</option>
                 
                 </select>
                
                </div>
                
                </div>
           
           <div className="book-title">{book.title}</div>
           
           <div className="book-authors">{ book.authors !== undefined ? book.authors.map((x)=>{
            return (
              <span key={x}>{x}</span>
              )
           }):'Author Data Not Available'}</div>
                 
                 </div>
                  
                  </li>
                  )
              })
            		)}
                  

              </ol>
            
           </div>
           
       
                 
                 </div>
                  
             
        
    
        )
		
		
}

Search.propTypes={
  Contacts : PropTypes.array.isRequired,
  origin : PropTypes.func.isRequired,
}

export default Search;