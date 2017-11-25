using Campus.Common;
using Campus.Common.Security;
using Newtonsoft.Json;
using Site.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;

namespace Site
{
    public class CampusClient
    {
        public PublicProfile GetUserProfile(string userIdentifier)
        {
            var url = $"{ApiEndpoint}Account/Public/{userIdentifier}";

            var json = String.Empty;

            try
            {
                var handler = new HttpClientHandler();
                var client = new HttpClient(handler);
                var result = client.GetStringAsync(url);
                json = result.Result;
            }
            catch { }

            if (String.IsNullOrEmpty(json))
            {
                return null;
            }

            var profile = JsonConvert.DeserializeObject<PublicProfile>(json);

            profile.ContactRecords = profile.ContactRecords.OrderBy(o => o.Name).ToList();

            return profile;
        }

        private static String _secureApiEndpoint;
        private static String _apiEndpoint;

        public static String SecureApiEndpoint
        {
            get
            {
                if (String.IsNullOrEmpty(_secureApiEndpoint))
                {
                    _secureApiEndpoint = WebConfigurationManager.AppSettings["secure-campus-api-endpoint"];
                }

                return _secureApiEndpoint;
            }
        }

        public static String ApiEndpoint
        {
            get
            {
                if (String.IsNullOrEmpty(_apiEndpoint))
                {
                    _apiEndpoint = WebConfigurationManager.AppSettings["campus-api-endpoint"];
                }

                return _apiEndpoint;
            }
        }

        public Publication GetLastPublication()
        {
            var files = Directory.GetFiles(HttpContext.Current.Server.MapPath("~/static/"));

            var list = new List<Publication>();

            foreach (var file in files)
            {
                try
                {
                    list.Add(new Publication
                    {
                        Date = DateTime.Parse(Path.GetFileNameWithoutExtension(file)),
                        Content = System.IO.File.ReadAllText(file),
                    });
                }
                catch { }
            }


            var publication = list.OrderByDescending(o => o.Date).FirstOrDefault();

            return publication;
        }

        public static Position GetUserPrimaryPosition(PublicProfile profile)
        {
            var position = profile.Positions.FirstOrDefault(o => o.Employment == Employment.FullTime);
            return position ?? profile.Positions.FirstOrDefault();
        }

        public static Uri GetProfileCanonicalUrl(PublicProfile profile)
        {
            var position = GetUserPrimaryPosition(profile);

            var canonicalHost = "kpi.ua";
            var schema = "https://";

            if (!String.IsNullOrEmpty(position?.Subdivision?.Url))
            {
                try
                {
                    var uri = new Uri(position.Subdivision.Url);
                    canonicalHost = uri.Host.ToLower();
                    schema = "http://";
                }
                catch { }
            }

            return new Uri($"{schema}intellect.{canonicalHost}/profile/{profile.UserIdentifier}");
        }
    }
}
