using System;
using System.Collections.Generic;
using System.Security.Claims;
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
        // using user repository
        private readonly IUserRepo _userRepo;

        // IMapper simplifies mapping of entities
        private readonly IMapper _mapper;

        public UsersController(IMapper mapper, IUserRepo userRepo)
        {
            _mapper = mapper;
            _userRepo = userRepo;

        }

        // get all users
        [HttpGet]
        public async Task<ActionResult<List<ReaderUserDTO>>> Get()
        {
            var users = await _userRepo.GetUsers();
             var readerUsersToReturn = _mapper.Map<List<ReaderUserDTO>>(users);
            return Ok(readerUsersToReturn);
        }

        //get user by id
        [Authorize]
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

        // get user by username
        [Authorize]
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

        // user data update - using put
        // passing in the userUpdateDTO
        [HttpPut]
        public async Task<ActionResult> UpdateUser(UserUpdateDTO userUpdateDto) 
        {
            // getting username from the token that is used to authenticate
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepo.GetUserByName(username);

            // using mapper
            // instead of manual mapping that would require
            // manual mapping of all properties
            // eg. : user.info = userUpdateDto.info;
            _mapper.Map(userUpdateDto, user);
            
            // TODO WATCH DANGER - check succesful
            try 
            {
                _userRepo.UpdateProfile(user);
                return NoContent();
            }
            catch (Exception ex) 
            {
             throw ex;
            }
            
        }

    }
}