using AutoMapper;
using BooksApi.DTOs;
using Models;

namespace BooksApi.Helpers
{
    public class AutoMaperProfile : Profile
    {
        public AutoMaperProfile()
        {
            // map model to dto
            CreateMap<AppUser, ReaderUserDTO>();
        }
    }
}