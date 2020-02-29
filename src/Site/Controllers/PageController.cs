using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Site.Controllers
{
    public class PageController : Site.Controller
    {
        public PageController(IWebHostEnvironment env) 
            : base(env)
        {
        }

        [Route("Page/{name}")]
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
            return System.IO.File.ReadAllText(MapPath($"~/static/{name}.html"));
        }
    }
}