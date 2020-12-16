using System.Collections.Generic;
using System.Threading.Tasks;
using BooksApi.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers
{

    public class UsersController : BaseApiController
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
            
        }


        [HttpGet]
        public ActionResult<List<AppUser>> Get() =>
            _userService.Get();

        [Authorize]
        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<AppUser> Get(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }        
    }
}