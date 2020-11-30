using System.ComponentModel.DataAnnotations;

namespace BooksApi.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string username { get; set; }

        [Required]
        public string password { get; set; }
    }
}