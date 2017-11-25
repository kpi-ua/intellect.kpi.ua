using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using Site.Models;

namespace Site.Controllers
{
    public class HomeController : Controller
    {
        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public ActionResult Index()
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

        public ActionResult Search()
        {
            return View();
        }

        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public ActionResult NotFound()
        {
            return View();
        }
    }
}