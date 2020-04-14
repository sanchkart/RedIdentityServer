using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace REDCAD.Web.Identity.Api
{
    public class Startup
    {
        public void ConfigureServices(
            IServiceCollection services)
        {
            services.AddAuthentication(IdentityServerAuthenticationDefaults.JwtAuthenticationScheme)
                    .AddIdentityServerAuthentication(options =>
                     {
                         //options.Authority = "http://rc-ts-az-002.westeurope.cloudapp.azure.com:81"; // Auth Server
                         options.Authority = "http://localhost:5000"; // Auth Server
                         options.RequireHttpsMetadata = false;
                         options.ApiName = "redcad_api"; // API Resource Id
                     });
            services.Configure<IISOptions>(options =>
            {
            });
            services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials()));

            services.AddMvc();
        }

        public void Configure(
            IApplicationBuilder app, 
            IHostingEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseAuthentication();
            app.UseMvcWithDefaultRoute();
            app.UseCors("AllowAll");
        }
    }
}
