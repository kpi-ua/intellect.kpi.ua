using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Site
{
    public class Controller : Microsoft.AspNetCore.Mvc.Controller
    {
        protected readonly CampusClient Client = new CampusClient();

        private readonly IHostingEnvironment _env;

        public Controller(IHostingEnvironment env)
        {
            _env = env;
        }

        protected string MapPath(string path)
        {
            path = path.Replace("~", "");
            return _env.WebRootPath + path;
        }

#if DEBUG
        protected const int OutputCacheDuration = 0;
#else
        protected const int OutputCacheDuration = 60 * 15;
#endif

    }
}
