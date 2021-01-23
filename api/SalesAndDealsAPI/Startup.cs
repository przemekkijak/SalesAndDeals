using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SalesAndDealsAPI.Models;
using DotNetEnv;

namespace SalesAndDealsAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            DotNetEnv.Env.Load();
            services.AddControllers();
            services.AddDbContextPool<SnDContext>(options => options.UseMySql(
                $"server={DotNetEnv.Env.GetString("DBHOST")};port={DotNetEnv.Env.GetString("DBPORT")};database={DotNetEnv.Env.GetString("DBNAME")};uid={DotNetEnv.Env.GetString("DBLOGIN")};password={DotNetEnv.Env.GetString("DBPASS")}",
                new MySqlServerVersion(new Version(8, 0, 21)),
                mySqlOptions => mySqlOptions
                .CharSetBehavior(Pomelo.EntityFrameworkCore.MySql.Infrastructure.CharSetBehavior.NeverAppend))
            .EnableSensitiveDataLogging()
            .EnableDetailedErrors());

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
