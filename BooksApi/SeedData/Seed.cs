using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace BooksApi.SeedData
{
    public class Seed
    {
        public static async Task SeedUser(UserService _uService) 
        {
            if(!_uService.CheckIfAnyExist()) 
            {
                var userData = await System.IO.File.ReadAllTextAsync("SeedData/userSeed.json");
                System.Console.Write(userData);
                var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

                foreach (var user in users) 
                {
                    using var hmac = new HMACSHA512();

                    user.username = user.username.ToLower();
                    user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password"));
                    user.PasswordSalt = hmac.Key;

                    _uService.Create(user);
                }
            }
        }

        public static async Task SeedBooks(BookService _bService) 
        {

            if(!_bService.CheckIfAnyExist())
            {
                var bookData = await System.IO.File.ReadAllTextAsync("SeedData/bookSeed.json");
                System.Console.Write(bookData); //TODO comment out for production

                var books = JsonSerializer.Deserialize<List<Book>>(bookData);

                foreach ( var book in books) 
                {
                    _bService.Create(book);
                }

            }
        }
    }
}