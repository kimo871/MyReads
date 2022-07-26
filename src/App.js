import "./App.css";
import React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import ShelfBooks  from './Shelf';
import Search from './Search';
import * as ShelfApi from './BooksAPI.js';
import {Routes , Route } from 'react-router-dom'

function App() {
   let [Contacts ,update] = useState([]);


  useEffect(  ()=>{
   let bool = true;
    let call2 = async () =>{
    const t = await ShelfApi.getAll();
    if(bool){
      console.log(t);
    update(t);
  }
  }
  call2();
  return ()=>{
    bool = false;
  }
  },[])

  

  return (
     <Routes >
    <Route exact path="/"  element={<ShelfBooks Contacts ={Contacts} origin={update}/>}>
    
    </Route>

    <Route exact path="/search"  element={<Search Contacts={Contacts} origin={update}/>}>
    
    </Route>
    </Routes>


  );
}

export default App;
