using System.Web.Mvc;
using System.Web.Routing;

namespace Site
{
    public class Config
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Search",
                url: "Search",
                defaults: new { controller = "Home", action = "Search" }
            );

            routes.MapRoute(
                name: "Home",
                url: "NotFound",
                defaults: new { controller = "Home", action = "NotFound" }
            );

            //routes.MapRoute(
            //    name: "Profile",
            //    url: "Profile/{userIdentifier}",
            //    defaults: new { controller = "Profile", action = "Index" }
            //);

            routes.MapRoute(
               name: "Profile",
               url: "Profile/{userIdentifier}/{action}",
               defaults: new { controller = "Profile", action = "Index" }
           );

            routes.MapRoute(
                name: "Page",
                url: "Page/{name}",
                defaults: new { controller = "Page", action = "Index" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
