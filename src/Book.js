import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
function Book({book,Contacts,shelves,send}){
	return (
		<div key={book.id} className="book">
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
            <select value={book.shelf} onChange={(e)=>{send(e,book,Contacts,shelves);}}>
               <option value="none2" disabled>
                  Move to...
                </option>
                {shelves.map((shelf)=>{
                	return (
                     <option key={shelf.id} value={shelf.shelfName}>
                       {shelf.shelfDisplayName}
                       </option>
                		 )
                       })
                     }
                    
                 <option value="none">None</option>
                 
                 </select>
                
                </div>
                
                </div>
           
           <div className="book-title">{book.title}</div>
           
           <div className="book-authors">{book.authors.map((x)=>{
            return (
              <span key={x}>{x}</span>
              )
           })}</div>
                 
                 </div>
	)
}

Book.propTypes={
	book : PropTypes.object.isRequired,
	Contacts : PropTypes.array.isRequired,
	shelves : PropTypes.array.isRequired,
	send : PropTypes.func.isRequired
}

export default Book ;