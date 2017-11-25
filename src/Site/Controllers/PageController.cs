using System;
using System.Web.Mvc;

namespace Site.Controllers
{
    public class PageController : Controller
    {
        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public ActionResult Index(string name)
        {
            var html = LoadPage(name);

            if (String.IsNullOrEmpty(html))
            {
                return HttpNotFound();
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