// load models from model directory
const fs = require('fs');
const files = fs.readdirSync(__dirname);
let db = {};

files.forEach( function( filename ){
   let filebase = filename.split('.')[0];
   if( filename !== 'index.js' ) {
      console.log(`   > loading mongoose model: ${filename}`);
      db[filebase] = require(`${__dirname}/${filename}`);
   }
});


// Exporting an object containing all of our models
module.exports = {
   db,
   BookModel23: require("./book")
   
 };
 