import React, { useState, useRef } from "react";

function Search( props ){
   
    const [ showBook, setShowBook ]= useState([]);
    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );
    
    const txtSearch = useRef();    
    
    const style = {
        Box: { border: "1px darkgray solid" },
        BgColor: { backgroundColor: 'white'}
      }

    
    function searched(event) {
        event.preventDefault();
        searchbooks(txtSearch.current.value);
    }


    async function searchbooks( txtSearch ){    
        const apiBook = await fetch(`/api/books/${txtSearch}`).then( result=>result.json() ).catch(err => []);
        console.log(apiBook)
        setShowBook( apiBook );
        

        if (apiBook.length>0){
            setAlertMessage( { type: 'success', message: 'Thank you, result found!' } );
            setTimeout( function(){ setAlertMessage({ type: "", message: ""}); }, 3000 );
        } else {
            // setAlertMessage( { type: 'danger', message: apiResult.error } );
            setAlertMessage( { type: 'danger', message: "The search keyword did not found, please try again!" } );
            setTimeout( function(){ setAlertMessage({ type: "", message: ""});}, 3000 );
        }

    }


    async function savebook( e, book ){    
        // console.log("<<executing savebook function inside search component>>")
        e.preventDefault();

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({mybook:{ 
                booktitle : book.booktitle,
                bookimageLinks : book.bookimageLinks,
                bookinfoLink : book.bookinfoLink,
                bookdescription : book.bookdescription,
                bookauthors : book.bookauthors 
            }})
        };
        const apiBook = await fetch(`/api/books`, requestOptions).then( result=>result.json() );
    }

    function viewlink(e){
        window.location.assign(e.target.dataset.sahar);
    }


    return (
        <>
            {/* { (alert) ? <Redirect to='/search' /> : '' } */}


            <div class="container">
            <div className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">
                {alertMessage.message}
            </div>

            <div class="row">
                <div class="col-12 pl-0 pr-0" style={style.Box}>
                    <div class="jumbotron jumbotron-fluid pb-1 pt-1 mb-0" style={style.BgColor}>
                        <h1 class="display-6 d-flex justify-content-center mt-3">(React) Google Books Search</h1>
                        <p class="display-6 lead d-flex justify-content-center">Search for and Save Books of Interest</p>
                    </div>
                </div>
            </div>        

            <div class="row"> <div class="col-12"> &nbsp; </div> </div>        

            <div class="row">
                <div class="col-12 pl-0 pr-0" style={style.Box}>
                    <div class="jumbotron pl-0 pr-0 pb-0 pt-0" style={style.BgColor}>
                        <div class="row ">
                            <div class="col-12 pl-4 ml-2 mt-3 "><h4>Book Search</h4></div>
                        </div>
                        <div class="row">
                            <div class="col-12 pl-5 pr-5">
                                    <div class="form-group mb-0 ">
                                        <label for="searchtxt"></label>
                                        <input id="searchtxt" type="text" ref={txtSearch} class="form-control"></input>
                                    </div>
                                    <div class="col-12 d-flex justify-content-end pr-0"><button onClick={searched} class="btn btn-primary submit">Search</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>         

            <div class="row"> <div class="col-12"> &nbsp; </div> </div>      

            <div class="row" style={{display: (showBook.length>0) ? 'block' : 'none' }}>
                <div class="col-12" style={style.Box}>
                    <div class="jumbotron pl-0 pr-0 pb-0 pt-0" style={style.BgColor}>
                        <div class="row"><div class="col-12 mb-2 mt-2"><h5>Results:</h5></div></div> 

                        { showBook.map( book =>
                                                <div class="col-12 mb-1" style={style.Box}>
                                                    <div class="row">
                                                        <div class="col-6 d-flex justify-content-start">
                                                            <div class="row mb-0">
                                                                <h3 class="col-12 mt-4 pl-3" >{book.volumeInfo.title}</h3>
                                                                <h6 class="col-12 mb-2 pl-4" ><b>Written by: </b>{book.volumeInfo.authors}</h6>
                                                            </div>
                                                        </div>
                                                        <div class="col-6 mt-2 d-flex justify-content-end align-self-baseline">
                                                            <button data-sahar={book.volumeInfo.infoLink} onClick={viewlink}>View</button>
                                                            &nbsp;
                                                            <button onClick={
                                                            (e) => savebook(e,
                                                                {
                                                                    booktitle : book.volumeInfo.title,
                                                                    bookimageLinks : book.volumeInfo.imageLinks,
                                                                    bookinfoLink : book.volumeInfo.infoLink,
                                                                    bookdescription : book.volumeInfo.description,
                                                                    bookauthors : book.volumeInfo.authors
                                                                }
                                                            )}>Save</button>
                                                        </div>
                                                    </div>
                                                    <div class="row pb-4">
                                                        <div class="col-2 d-flex justify-content-start align-self-baseline">
                                                        <img src={(book.volumeInfo.imageLinks)?book.volumeInfo.imageLinks.smallThumbnail:'https://placehold.it/100x100'} alt={book.volumeInfo.title} class='img-thumbnail' />
                                                        </div>
                                                        <div class="col-9 ml-4 pl-4 d-flex justify-content-start align-self-baseline">
                                                            <div>{book.volumeInfo.description}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                    )}

                    </div>
                </div>
            </div>

            <div class="row"> <div class="col-12"> &nbsp; </div> </div>      

            </div>

        </>
    )
}


export default Search;