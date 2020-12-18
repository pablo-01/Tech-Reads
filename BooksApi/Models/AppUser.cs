using System;
using System.Collections.Generic;
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

        public ICollection<ReadingHistory> history { get; set; }
        
        public string photoUrl { get; set; }
    }
}