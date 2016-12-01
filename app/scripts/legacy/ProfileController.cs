using Campus.Common;
using Core;
using System;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using Campus.Common.Security;

namespace Site.Controllers
{
    public class ProfileController : Core.Controller
    {
        private PublicProfile _currentProfile;

        protected override bool CheckCanonicalUrl(ActionExecutingContext filterContext)
        {
            if (_currentProfile == null)
            {
                _currentProfile = _client.GetUserProfile(Convert.ToString(filterContext.ActionParameters["userIdentifier"]));
            }

            if (_currentProfile == null)
            {
                return true;
            }

            var position = GetUserPrimaryPosition(_currentProfile);

            if (position?.Subdivision != null)
            {
                if (String.IsNullOrEmpty(position.Subdivision.Url))
                {
                    return true;
                }

                var uri = new Uri(position.Subdivision.Url);
                var canonicalHost = "intellect." + uri.Host.ToLower();

                return CheckCanonicalHost(filterContext, canonicalHost);
            }

            return true;
        }

        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public ActionResult Index(string userIdentifier)
        {
            SetPageHeaderBackground();

            ViewBag.ProfileName = userIdentifier;

            if (_currentProfile == null)
            {
                _currentProfile = _client.GetUserProfile(userIdentifier);
            }

            if (_currentProfile == null)
            {
                return NotFound();
            }

            var position = GetUserPrimaryPosition(_currentProfile);

            if (position != null && !String.IsNullOrEmpty(position.Subdivision.Url))
            {
                try
                {
                    var uri = new Uri(position.Subdivision.Url);
                    ViewBag.Link = String.Format("http://intellect.{0}/profile/{1}", uri.Host, _currentProfile.UserIdentifier);
                }
                catch { }
            }

            SetOpenGraphMetadata();

            return View(_currentProfile);
        }

        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public ActionResult Conference(string userIdentifier)
        {
            return SubpageTemplate(userIdentifier);
        }

        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public ActionResult Execution(string userIdentifier)
        {
            return SubpageTemplate(userIdentifier);
        }

        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public ActionResult Publications(string userIdentifier)
        {
            return SubpageTemplate(userIdentifier);
        }

        [OutputCache(Duration = OutputCacheDuration, VaryByParam = "*")]
        public ActionResult Results(string userIdentifier)
        {
            return SubpageTemplate(userIdentifier);
        }

        #region Internal logic

        private ActionResult SubpageTemplate(string userIdentifier)
        {
            SetPageHeaderBackground();

            if (_currentProfile == null)
            {
                _currentProfile = _client.GetUserProfile(userIdentifier);
            }

            if (_currentProfile == null)
            {
                return NotFound();
            }

            SetOpenGraphMetadata();

            return View(_currentProfile);
        }

        private void SetOpenGraphMetadata()
        {
            if (_currentProfile != null)
            {
                ViewBag.Title = _currentProfile.FullName;

                SetOpenGraphMetadata(new OpenGraphMetadata
                {
                    Title = _currentProfile.FullName,
                    Description = String.Format("Науковий ступень: {0}. Наукові інтереси: {1}. Вчене звання: {2}",
                        _currentProfile.AcademicDegree, _currentProfile.GetField("ScientificInterest"),
                        _currentProfile.AcademicStatus),
                    Image = _currentProfile.Photo,
                    SiteName = "Intellect",
                    Url = String.Format("http://intellect.kpi.ua/profile/{0}", _currentProfile.UserIdentifier)
                });
            }
        }

        private static Position GetUserPrimaryPosition(PublicProfile profile)
        {
            var position = profile.Positions.FirstOrDefault(o => o.Employment == Employment.FullTime);
            return position ?? profile.Positions.FirstOrDefault();
        }

        private void SetPageHeaderBackground()
        {
            var path = "~/static/headers";
            var files = Directory.GetFiles(Server.MapPath(path));
            var file = files.OrderBy(o => Guid.NewGuid()).Select(Path.GetFileName).FirstOrDefault();

            ViewBag.Header = "/static/headers/" + file;
        }

        #endregion
    }
}