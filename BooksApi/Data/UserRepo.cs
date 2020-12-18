using System.Collections.Generic;
using System.Threading.Tasks;
using BooksApi.Interfaces;
using Models;
using Services;

namespace BooksApi.Data
{
    public class UserRepo : IUserRepo
    {
        private readonly UserService _uService;
        public UserRepo(UserService uService)
        {
            _uService = uService;
        }

        public async Task<AppUser> GetUserById(string id)
        {
            return await Task.FromResult(_uService.Get(id));
        }

        public async Task<AppUser> GetUserByName(string username)
        {
            return await  Task.FromResult(_uService.GetByUsername(username));
        }

        public async Task<IEnumerable<AppUser>> GetUsers()
        {
            return await Task.FromResult( _uService.Get());
        }

        public async Task<AppUser> Save(AppUser user)
        {
            return await Task.FromResult( _uService.Create(user));
        }

        public void UpdateProfile(string id, AppUser user)
        {
            _uService.Update(id, user);
        }
    }
}