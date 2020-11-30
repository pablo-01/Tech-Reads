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

    }
}