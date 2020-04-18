import React, { useState, useEffect, useRef } from "react";


function Saved( props ){
    const [ savedBooks, setSavedBooks ]= useState([]);
    
    const style = {
        Box: { border: "1px darkgray solid" },
        BgColor: { backgroundColor: 'white'}
      }

    // load only ONCE at component load
    // var savedbooksapi = [];
    useEffect( function(){
        loadBooks();
    }, [] );

    ;
    async function loadBooks( ){    
        const apiBook = await fetch(`/api/books`).then( result=>result.json() );
        setSavedBooks(apiBook)
    }

    function viewlink(e){
        window.location.assign(e.target.dataset.sahar);

    }

    async function deletelink(e, data){

        console.log(e);console.log(data);

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };

        const deleteResult = await fetch(`/api/books/`+data, requestOptions).then( result=>result.json() );
        if (deleteResult) loadBooks();
    }
    
    return (
        <>
            <div class="container">
                <div class="row">
                        { savedBooks.map( (book, index) =>
                                <div class="col-12 mb-1" style={style.Box}>
                                <div class="row">
                                    <div class="col-6 d-flex justify-content-start">
                                        <div class="row mb-0">
                                            <h3 class="col-12 mt-4 pl-3" >{book.title}</h3>
                                            <h6 class="col-12 mb-2 pl-4" ><b>Written by: </b>{book.authors}</h6>
                                        </div>
                                    </div>
                                    <div class="col-6 mt-2 d-flex justify-content-end align-self-baseline">
                                        <button data-sahar={book.link} onClick={viewlink}>View</button>
                                        &nbsp;
                                        <button data-sahar={book._id} onClick={(e)=>deletelink(e,book._id)}>Delete</button>
                                    </div>
                                </div>
                                <div class="row pb-4">
                                    <div class="col-2 d-flex justify-content-start align-self-baseline">
                                    <img src={(book.image)?book.image:'https://placehold.it/100x100'} alt={book.title} class='img-thumbnail' />
                                    </div>
                                    <div class="col-9 ml-4 pl-4 d-flex justify-content-start align-self-baseline">
                                        <div>{book.description}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
            
        </>
    )
}

export default Saved;