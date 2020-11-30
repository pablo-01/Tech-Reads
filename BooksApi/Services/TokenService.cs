using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BooksApi.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models;

namespace BooksApi.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {

            /// adding claims
            var claims = new List<Claim> 
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.username)
            };

            /// creating credentials
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            /// describing token

            var tokenDescriptor = new SecurityTokenDescriptor 
            {
                Subject = new ClaimsIdentity(claims),
                // TODO , fro production change expiry
                Expires = DateTime.Now.AddDays(5),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            /// creating token

            var token = tokenHandler.CreateToken(tokenDescriptor);


            /// return token

            return tokenHandler.WriteToken(token);
        }
    }
}