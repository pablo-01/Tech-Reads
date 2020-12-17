using System.Collections.Generic;
using System.Threading.Tasks;
using BooksApi.Controllers;
using BooksApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers
{

    public class UsersController : BaseApiController
    {
        private readonly IUserRepo _userRepo;

        public UsersController(IUserRepo userRepo)
        {
            _userRepo = userRepo;

        }


        [HttpGet]
        public async Task<ActionResult<List<AppUser>>> Get() 
        {
            return Ok(await _userRepo.GetUsers());
        }
        
            

        [Authorize]
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<AppUser>>  Get(string id)
        {
            var user = await _userRepo.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    }
}