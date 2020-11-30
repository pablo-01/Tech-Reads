using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using BooksApi.DTOs;
using BooksApi.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace BooksApi.Controllers
{

    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;

        private readonly UserService _userService;
        public AccountController(UserService userService, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _userService = userService;
        }

        [HttpPost("register")]
        public ActionResult<UserDTO> Register(RegisterDTO registerDto)
        {
            // Create index in MongoDb TODO
            var usernameExist = _userService.GetByUsername(registerDto.username);

            if (usernameExist != null)
            {
                return BadRequest("Username already exist");
            }

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                username = registerDto.username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
                PasswordSalt = hmac.Key
            };

            _userService.Create(user);

            return new UserDTO
            {
                username = user.username,
                token = _tokenService.CreateToken(user)
            };
        }


        [HttpPost("login")]
        public ActionResult<UserDTO> Login(LoginDTO loginDto)
        {
            // check for username
            var user = _userService.GetByUsername(loginDto.username);

            if (user == null) return Unauthorized("Invalid username");

            /// check password
            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));

            // compare
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            };

             return new UserDTO
            {
                username = user.username,
                token = _tokenService.CreateToken(user)
            };

        }
    }
}