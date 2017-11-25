using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Site.Models;

namespace Site.Controllers
{
    public class HomeController : Site.Controller
    {        
        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public IActionResult Index()
        {
            var model = new HomeViewModel
            {
                Publication = Client.GetLastPublication(),
                Slides = GetSlides()
            };

            return View(model);
        }

        private IEnumerable<string> GetSlides()
        {
            var path = Server.MapPath("~/static/slides");
            var files = Directory.GetFiles(path);
            return files.Select(o => "/static/slides/" + Path.GetFileName(o)).ToList();
        }

        public IActionResult Search()
        {
            return View();
        }

        public IActionResult NotFound()
        {
            return View();
        }
    }
}