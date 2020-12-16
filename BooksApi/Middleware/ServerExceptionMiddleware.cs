using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using BooksApi.Error;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BooksApi.Middleware
{
    /// server Exception Middeware
    public class ServerExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        // ILogger for logging errors
        // in real life production loggin errors to database may be desired
        private readonly ILogger<ServerExceptionMiddleware> _logger;
        private readonly IHostEnvironment _environment;
        public ServerExceptionMiddleware(RequestDelegate next, ILogger<ServerExceptionMiddleware> logger, 
            IHostEnvironment environment)
        {
            _environment = environment;
            _logger = logger;
            _next = next;
        }

        // context of an http request, 
        public async Task InvokeAsync(HttpContext context) 
        {
            try
            {
                // getting context and passing it in to next middleware
                await _next(context);
            }

        catch(Exception ex) 
        {
            // log the error
            _logger.LogError(ex, ex.Message);
            
            /// write the exception to the response
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int) HttpStatusCode.InternalServerError; //500

            // create response
            // check environmant
            // conditional operator "?" evaluates boolean expression 
            // - if development mode create new server exception 
            var response = _environment.IsDevelopment()
                ? new ServerException(context.Response.StatusCode, ex.StackTrace?.ToString())  // if in development
                : new ServerException(context.Response.StatusCode, "Internal Server Error");   // if not in development
            
            //  ensuring json formatting
            var options =  new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

            // serialize response and pass in formatting options
            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
        }
    }
}