const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

// include mongoose models (it will include each file in the models directory)
const db = require( './models' );
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooksDB", { useNewUrlParser: true });

async function getBook( txtSearch ){
   console.log( '[getBook] txtSearch:', txtSearch );
   const dbData = await db.BookModel23.find({}); //findOne({ title: txtSearch });
   return (dbData )? dbData : []; 
}

async function saveBook( bookData ){
   console.log( 'inside [saveBook]' );
   
   console.log(bookData);

    const saveData = {
            title: bookData.mybook.booktitle,
            image: bookData.mybook.bookimageLinks.thumbnail,
            link: bookData.mybook.bookinfoLink,
            description : bookData.mybook.bookdescription,
            authors: bookData.mybook.bookauthors
          };

          console.log(saveData);

          const dbBook = new db.BookModel23( saveData );
          const saveBook = await dbBook.save();
          console.log(saveBook);
          return { message: "Book successfully saved ", id: saveBook._id, title:saveBook.title };
}

async function deleteBook( bookid ){
   const dbResult = await db.BookModel23.findByIdAndDelete(bookid);
   return dbResult._id ? true : false;
}


module.exports = {
   getBook,
   saveBook,
   deleteBook
};