using AutoMapper;
using BooksApi.Data;
using BooksApi.Helpers;
using BooksApi.Interfaces;
using BooksApi.Models;
using BooksApi.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Services;

namespace BooksApi.Extensions
{
    public static class AppServiceExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration Configuration) 
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepo, UserRepo>(); // WATCH

            services.AddAutoMapper(typeof(AutoMaperProfile).Assembly); // WATCH

            // requires using Microsoft.Extensions.Options
            services.Configure<BookstoreDatabaseSettings>(
            Configuration.GetSection(nameof(BookstoreDatabaseSettings)));

            services.AddSingleton<IBookstoreDatabaseSettings>(sp =>
            sp.GetRequiredService<IOptions<BookstoreDatabaseSettings>>().Value);

            services.AddSingleton<BookService>();

            services.AddSingleton<UserService>();

            return services;

        }
    }
}