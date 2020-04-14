﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace REDCAD.Web.Identity.Server
{
    public class Startup
    {
        public void ConfigureServices(
            IServiceCollection services)
        {
            services.AddMvc();
            services.AddIdentityServer()
                        .AddDeveloperSigningCredential(filename: "tempkey.rsa")
                        .AddInMemoryApiResources(Config.GetApiResources())
                        .AddInMemoryIdentityResources(Config.GetIdentityResources())
                        .AddInMemoryClients(Config.GetClients())
                        .AddTestUsers(Config.GetUsers());
        }

        public void Configure(
            IApplicationBuilder app, 
            IHostingEnvironment envloggerFactory)
        {
            app.UseDeveloperExceptionPage();
            app.UseIdentityServer();
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }
    }
}
