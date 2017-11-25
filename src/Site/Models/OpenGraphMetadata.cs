using System;

namespace Site.Models
{
    public class OpenGraphMetadata
    {
        public String Description { get; set; }
        public String SiteName { get; set; }
        public String AppId { get; set; }
        public String Title { get; set; }
        public String Type { get; set; }
        public String Url { get; set; }
        public String Image { get; set; }

        public bool Empty => String.IsNullOrEmpty(Description) &&
                             String.IsNullOrEmpty(SiteName) &&
                             String.IsNullOrEmpty(AppId) &&
                             String.IsNullOrEmpty(Title) &&
                             String.IsNullOrEmpty(Url) &&
                             String.IsNullOrEmpty(Image);
    }
}
