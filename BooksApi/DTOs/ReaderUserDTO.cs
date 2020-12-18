using System.Collections.Generic;
using Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BooksApi.DTOs
{
    public class ReaderUserDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string username { get; set; }

        // storage for user interests, array of book categories
        public string[] intrests { get; set; }

        public ICollection<ReadingHistory> history { get; set; }
        
        public string photoUrl { get; set; }
    }
        
}
