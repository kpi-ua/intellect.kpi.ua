using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Site.Controllers
{
    public class PageController : Site.Controller
    {
        public PageController(IHostingEnvironment env) 
            : base(env)
        {
        }

        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public IActionResult Index(string name)
        {
            var html = LoadPage(name);

            if (String.IsNullOrEmpty(html))
            {
                return NotFound();
            }

            return View((Object)html);
        }

        private string LoadPage(string name)
        {
            var path = MapPath($"~/static/{name}.html");
            return System.IO.File.ReadAllText(path);
        }

    }
}