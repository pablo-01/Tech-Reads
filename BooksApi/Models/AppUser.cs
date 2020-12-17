using System;
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

        // storage for user interests, array of book categories
        public string[] intrests { get; set; }

        public ReadingHistory[] history { get; set; }
        
        public string photoUrl { get; set; }
    }

    public class ReadingHistory  
    {
        public string bookId { get; set; }

        public string dateAdded { get; set; }

    }
}