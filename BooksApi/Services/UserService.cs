using System.Collections.Generic;
using System.Threading.Tasks;
using BooksApi.Models;
using Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Services
{
    public class UserService
    {
        private readonly IMongoCollection<AppUser> _users;


        public UserService(IBookstoreDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<AppUser>(settings.UsersCollectionName);
        }


        public List<AppUser> Get() =>
            _users.Find(user => true).ToList();

        public AppUser Get(string id) =>
            _users.Find<AppUser>(user => user.Id == id).FirstOrDefault();

        public AppUser Create(AppUser user)
        {
            _users.InsertOne(user);
            return user;
        }

        public virtual void Update(AppUser userIn) =>
            _users.ReplaceOne(user => user.username == userIn.username, userIn);

        public void Remove(AppUser userIn) =>
            _users.DeleteOne(user => user.Id == userIn.Id);

        public void Remove(string id) => 
            _users.DeleteOne(book => book.Id == id);


        public AppUser GetByUsername(string username) =>
            _users.Find<AppUser>(user => user.username == username).FirstOrDefault();

        public bool CheckIfAnyExist() 
        {
            var count = _users.CountDocuments(new BsonDocument());
            if (count == 0)
            {
                return false; 
            }
            return true;

        }

    }
}