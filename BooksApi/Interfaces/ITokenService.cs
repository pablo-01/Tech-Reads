using Models;

namespace BooksApi.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}