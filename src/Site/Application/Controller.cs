namespace Site
{
    public class Controller : System.Web.Mvc.Controller
    {
        protected readonly CampusClient Client = new CampusClient();

#if DEBUG
        protected const int OutputCacheDuration = 0;
#else
        protected const int OutputCacheDuration = 60 * 15;
#endif

    }
}
