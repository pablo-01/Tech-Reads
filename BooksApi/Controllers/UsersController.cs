using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BooksApi.Controllers;
using BooksApi.DTOs;
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
        private readonly IMapper _mapper;

        public UsersController(IMapper mapper, IUserRepo userRepo)
        {
            _mapper = mapper;
            _userRepo = userRepo;

        }


        [HttpGet]
        public async Task<ActionResult<List<ReaderUserDTO>>> Get()
        {
            var users = await _userRepo.GetUsers();
             var readerUsersToReturn = _mapper.Map<List<ReaderUserDTO>>(users);
            return Ok(readerUsersToReturn);
        }


        //[Authorize]
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<ReaderUserDTO>> Get(string id)
        {
            var user = await _userRepo.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return _mapper.Map<ReaderUserDTO>(user);
        }


        [HttpGet("{username}")]
        public async Task<ActionResult<ReaderUserDTO>> GetByName(string username) 
        {
            var user = await _userRepo.GetUserByName(username);

            if (user == null)
            {
                return NotFound();
            }

            return _mapper.Map<ReaderUserDTO>(user);
        }
    }
}