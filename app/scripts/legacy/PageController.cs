using System;
using System.Web.Mvc;

namespace Site.Controllers
{
    public class PageController : Core.Controller
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

    }
}