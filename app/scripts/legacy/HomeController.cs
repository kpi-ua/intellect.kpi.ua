using Core.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace Site.Controllers
{
    public class HomeController : Core.Controller
    {
        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public ActionResult Index()
        {
            var model = new HomeViewModel
            {
                Publication = _client.GetLastPublication(),
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

        public ActionResult Search()
        {
            return View();
        }

        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public new ActionResult NotFound()
        {
            return View();
        }
    }
}