using System;
using Microsoft.AspNetCore.Mvc;

namespace Site.Controllers
{
    public class PageController : Site.Controller
    {
        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public IActionResult Index(string name)
        {
            var html = LoadPage(name);

            if (String.IsNullOrEmpty(html))
            {
                return NotFound()();
            }

            return View((Object)html);
        }

        private string LoadPage(string name)
        {
            var path = Server.MapPath($"~/static/{name}.html");
            return System.IO.File.ReadAllText(path);
        }

    }
}