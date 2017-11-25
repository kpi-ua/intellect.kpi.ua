namespace Site
{
    public class Controller : Microsoft.AspNetCore.Mvc.Controller
    {
        protected readonly CampusClient Client = new CampusClient();

#if DEBUG
        protected const int OutputCacheDuration = 0;
#else
        protected const int OutputCacheDuration = 60 * 15;
#endif

    }
}
