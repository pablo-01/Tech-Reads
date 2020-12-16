using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BooksApi.SeedData;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Services;

namespace BooksApi
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();
            var service = scope.ServiceProvider;
            try
            {
                var userContext = service.GetRequiredService<UserService>();
                await Seed.SeedUser(userContext);

            }
            catch (Exception ex)
            { 
                var logger = service.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "Error during seeding users");
            }


            try
            {
                var bookContext = service.GetRequiredService<BookService>();
                await Seed.SeedBooks(bookContext);

            }
            catch (Exception ex)
            {
                var logger = service.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "Error during seeding books");
            }

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
