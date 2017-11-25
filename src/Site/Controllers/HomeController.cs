using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Site.Models;

namespace Site.Controllers
{
    public class HomeController : Site.Controller
    {
        public HomeController(IHostingEnvironment env)
            : base(env)
        {
        }

        public Publication GetLastPublication()
        {
            var files = Directory.GetFiles(MapPath("~/static/"));

            var list = new List<Publication>();

            foreach (var file in files)
            {
                try
                {
                    list.Add(new Publication
                    {
                        Date = DateTime.Parse(Path.GetFileNameWithoutExtension(file)),
                        Content = System.IO.File.ReadAllText(file),
                    });
                }
                catch { }
            }


            var publication = list.OrderByDescending(o => o.Date).FirstOrDefault();

            return publication;
        }

        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public IActionResult Index()
        {
            var model = new HomeViewModel
            {
                Publication = GetLastPublication(),
                Slides = GetSlides()
            };

            return View(model);
        }

        private IEnumerable<string> GetSlides()
        {
            var path = MapPath("~/static/slides");
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