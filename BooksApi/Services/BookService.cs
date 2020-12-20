using BooksApi.Models;
using Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections;
using System.Collections.Generic;
using System.Linq;



namespace Services
{
    public class BookService
    {
        private readonly IMongoCollection<Book> _books;

        public BookService(IBookstoreDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _books = database.GetCollection<Book>(settings.BooksCollectionName);
        }

        public List<Book> Get() =>
            _books.Find(book => true).ToList();


        // This is not a best way of doing that
        // categories should have its own model TODO
        public List<string> GetCategories() 
        {


            var categories = new List<string>();
            var books = _books.Find(book => true).ToList();
            foreach(var book in books) {
                categories.Add(book.category);
            }

            return categories;
        }


        // This is not a best way of doing that
        // since all the book date is on client side already
        // but in production books would have pagination and not all books would be featched
        // TO refactor

        ////
        // In general searching and filtering would be much better done 
        // by using mongoDB $ text search/index
        ////
        public string[] GetAuthors() 
        {
            var authors = new List<string[]>();
            var books = _books.Find(book => true).ToList();
            foreach(var book in books) {
            authors.Add(book.authors);
            }

            var newArray = authors.SelectMany(item => item).Distinct().ToArray();
            return newArray;
        }


        // get by id 
        public Book Get(string id) =>
            _books.Find<Book>(book => book._id == id).FirstOrDefault();


        // create
        public Book Create(Book book)
        {
            _books.InsertOne(book);
            return book;
        }


        // update
        public void Update(string id, Book bookIn) =>
            _books.ReplaceOne(book => book._id == id, bookIn);


        // remove
        public void Remove(Book bookIn) =>
            _books.DeleteOne(book => book._id == bookIn._id);


        // remove by id
        public void Remove(string id) => 
            _books.DeleteOne(book => book._id == id);


        // check if exists method
        public bool CheckIfAnyExist() 
        {
            var count = _books.CountDocuments(new BsonDocument());
            if (count == 0)
            {
                return false; 
            }
            return true;

        }
        
    }
}