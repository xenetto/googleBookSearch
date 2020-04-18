require('dotenv').config(); // --> process.env
const mongoose = require('mongoose');
const express = require( 'express' );
const path =require('path');
const axios = require('axios');
const bodyParser = require("body-parser");
const orm = require( './db/orm.mongoose' );

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooksDB";
mongoose.connect(MONGODB_URI);

const app = express();

app.use( express.static('client/build') );

app.use( express.urlencoded({ extended: false }) );


app.get('/api/books/:title', async function( req,res ){
    // parse the :id and serve ONE product.
    // const books = JSON.parse( fs.readFileSync( "db/products.json" ) );
    const title = req.params.title;

    console.log(escape(title))

    //const books = products.filter( product=>product.id===id )[0]

    // const books = await orm.getBook("title");
    const books = await axios.get('https://www.googleapis.com/books/v1/volumes?q='+ escape(title)) //+ "&key=AIzaSyBAzph4dcGUEI9hkcIh7XuZJzpBuNhEJ9s&projection=lite")
    .then(books => {
      console.log(books.data.items)
      res.json(books.data.items);
    })
    .catch(err => {
        console.log("error")
        res.json(err);
    });


});

app.get('/api/books', async function( req,res ){
    console.log("inside server route")
    const books = await orm.getBook("")
    res.send((books.length>0)? books : []);
});

app.use(bodyParser.json());
app.post('/api/books', async function( req,res ){
  
    const bookData = req.body;
      
    const Result = await orm.saveBook( bookData );
    res.send( Result );

});


app.delete('/api/books/:id', async function( req,res ){
    const deleteID = req.params.id;
    const Result = await orm.deleteBook( deleteID );
    res.send( Result );
});


app.get('*', function( req,res ){
    console.log("redirect to index page!");
    res.sendFile( path.join(__dirname, '/client/build/', 'index.html') );
});


app.listen( PORT, function(){
    console.log( `[googlebooks server] Running, http://localhost:${PORT}` );
 });