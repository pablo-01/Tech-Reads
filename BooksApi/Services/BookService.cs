using BooksApi.Models;
using Models;
using MongoDB.Bson;
using MongoDB.Driver;
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

        public Book Get(string id) =>
            _books.Find<Book>(book => book._id == id).FirstOrDefault();

        public Book Create(Book book)
        {
            _books.InsertOne(book);
            return book;
        }

        public void Update(string id, Book bookIn) =>
            _books.ReplaceOne(book => book._id == id, bookIn);

        public void Remove(Book bookIn) =>
            _books.DeleteOne(book => book._id == bookIn._id);

        public void Remove(string id) => 
            _books.DeleteOne(book => book._id == id);

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