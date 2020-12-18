using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace BooksApi.Interfaces
{
    public interface IUserRepo
    {
         void UpdateProfile(string id, AppUser user);
         Task<AppUser> Save(AppUser user);
         Task<IEnumerable<AppUser>> GetUsers();
         Task<AppUser> GetUserById(string id);

         Task<AppUser> GetUserByName(string username);

    }
}