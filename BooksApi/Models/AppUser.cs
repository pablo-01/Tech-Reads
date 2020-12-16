using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models
{
    public class AppUser
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string username { get; set; }

        [BsonRepresentation(BsonType.Binary)]
        public byte[] PasswordHash { get; set; }

        [BsonRepresentation(BsonType.Binary)]
        public byte[] PasswordSalt { get; set; }

        // storage for books IDs, array, - books that users have read


        // storage for user interests, array of book categories

    }
}