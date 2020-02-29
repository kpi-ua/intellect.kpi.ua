using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Site
{
    public class Controller : Microsoft.AspNetCore.Mvc.Controller
    {
        protected readonly CampusClient Client = new CampusClient();

        private readonly IWebHostEnvironment _env;

        public Controller(IWebHostEnvironment env)
        {
            _env = env;
        }

        protected string MapPath(string path)
        {
            var root = _env.WebRootPath;

            if (string.IsNullOrWhiteSpace(root))
            {
                root = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            path = path.Replace("~", "");

            return root + path;
        }

#if DEBUG
        protected const int OutputCacheDuration = 0;
#else
        protected const int OutputCacheDuration = 60 * 15;
#endif

    }
}
