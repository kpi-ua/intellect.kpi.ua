using Campus.Common;
using Campus.Common.Security;
using Newtonsoft.Json;
using System;
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
        
        public static String ApiEndpoint => "https://api.campus.kpi.ua/";
        
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
