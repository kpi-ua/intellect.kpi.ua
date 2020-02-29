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

            var json = string.Empty;

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
        
        public static string ApiEndpoint => "https://api.campus.kpi.ua/";

        public static Uri GetProfileCanonicalUrl(PublicProfile profile)
        {

            var primaryPosition = profile.Positions.FirstOrDefault(o => o.Employment == Employment.FullTime) ??
                                  profile.Positions.FirstOrDefault();
            
            var canonicalHost = "kpi.ua";
            var schema = "https://";

            if (!string.IsNullOrEmpty(primaryPosition?.Subdivision?.Url))
            {
                try
                {
                    var uri = new Uri(primaryPosition.Subdivision.Url);
                    canonicalHost = uri.Host.ToLower();
                    schema = "http://";
                }
                catch { }
            }

            return new Uri($"{schema}intellect.{canonicalHost}/profile/{profile.UserIdentifier}");
        }
    }
}
