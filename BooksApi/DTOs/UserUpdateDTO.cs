using System.Collections.Generic;
using Models;

namespace BooksApi.DTOs
{
    ////
    //DTO for user data update
    //
    ////
    public class UserUpdateDTO
    {
        public string info { get; set; }
        public string[] intrests { get; set; }

        public ICollection<ReadingHistory> history { get; set; }     
    }
}