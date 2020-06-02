# Google Books Search

A single-page react-based applicatopn,which user can search for books via the Google Books API and render them. User has the option to "View" a book (by bringing them to the book on Google Books), or "Save" a book (by saving it to the Mongo database), or "Delete" a book  (by removing it from the database).

All the books have each of the following fields:

* `title` - Title of the book from the Google Books API

* `authors` - The books's author(s) as returned from the Google Books API

* `description` - The book's description as returned from the Google Books API

* `image` - The Book's thumbnail image as returned from the Google Books API

* `link` - The Book's information link as returned from the Google Books API


This app has React components, works with helper/util functions, and utilizes React lifecycle methods to query and display books based on user searches. 

I've used Node, Express and MongoDB so that users can save books to review or purchase later.

* The layout is included two React Components for each page `Search` and `Saved` and the following Express routes are added for this app:

* `/api/books` (get) - to return all saved books as JSON.

* `/api/books` (post) - to save a new book to the database.

* `/api/books/:id` (delete) - to delete a book from the database by Mongo `_id`.



