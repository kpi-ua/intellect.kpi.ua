using Campus.Common;
using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Site.Models;
using Microsoft.AspNetCore.Mvc;

namespace Site.Controllers
{
    public class ProfileController : Site.Controller
    {
        public ProfileController(IHostingEnvironment env)
            : base(env)
        {
        }

        [Route("Profile/{userIdentifier}/")]
        public IActionResult Index(string userIdentifier)
        {
            var profile = Client.GetUserProfile(userIdentifier);

            if (profile == null)
            {
                return Redirect("~/NotFound");
            }

            var url = CampusClient.GetProfileCanonicalUrl(profile);
            
            if (Request?.Host.Host != url.Host && Request?.Host.Host != "localhost")
            {
                return RedirectPermanent(url.ToString());
            }

            SetPageHeaderBackground();

            ViewBag.ProfileName = userIdentifier;

            var position = CampusClient.GetUserPrimaryPosition(profile);

            if (!String.IsNullOrEmpty(position?.Subdivision.Url))
            {
                try
                {
                    var uri = new Uri(position.Subdivision.Url);
                    ViewBag.Link = $"http://intellect.{uri.Host}/profile/{profile.UserIdentifier}";
                }
                catch { }
            }

            SetOpenGraphMetadata(profile);

            return View(profile);
        }

        [Route("Profile/{userIdentifier}/Conference")]
        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public IActionResult Conference(string userIdentifier)
        {
            return SubpageTemplate(userIdentifier);
        }

        [Route("Profile/{userIdentifier}/Execution")]
        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public IActionResult Execution(string userIdentifier)
        {
            return SubpageTemplate(userIdentifier);
        }

        [Route("Profile/{userIdentifier}/Publications")]
        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public IActionResult Publications(string userIdentifier)
        {
            return SubpageTemplate(userIdentifier);
        }

        [Route("Profile/{userIdentifier}/Results")]
        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public IActionResult Results(string userIdentifier)
        {
            return SubpageTemplate(userIdentifier);
        }

        #region Internal logic

        private IActionResult SubpageTemplate(string userIdentifier)
        {
            var profile = Client.GetUserProfile(userIdentifier);

            if (profile == null)
            {
                return Redirect("~/NotFound");
            }

            var url = CampusClient.GetProfileCanonicalUrl(profile);

            if (Request.Host.Host != url.Host && Request.Host.Host != "localhost")
            {
                return RedirectPermanent(url.ToString());
            }

            SetPageHeaderBackground();

            SetOpenGraphMetadata(profile);

            return View(profile);
        }

        private void SetOpenGraphMetadata(PublicProfile profile)
        {
            if (profile != null)
            {
                ViewBag.Title = profile.FullName;

                ViewBag.Og = new OpenGraphMetadata
                {
                    Title = profile.FullName,
                    Description = $"Науковий ступень: {profile.AcademicDegree}. Наукові інтереси: {profile.GetField("ScientificInterest")}. Вчене звання: {profile.AcademicStatus}",
                    Image = profile.Photo,
                    SiteName = "Intellect - КПІ ім. Ігоря Сікорського",
                    Url = CampusClient.GetProfileCanonicalUrl(profile).ToString()
                };
            }
        }

        private void SetPageHeaderBackground()
        {
            var path = "~/static/headers";
            var files = Directory.GetFiles(MapPath(path));
            var file = files.OrderBy(o => Guid.NewGuid()).Select(Path.GetFileName).FirstOrDefault();

            ViewBag.Header = "/static/headers/" + file;
        }

        #endregion
    }
}