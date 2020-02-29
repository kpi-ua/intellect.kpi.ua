namespace Site.Models
{
    public class OpenGraphMetadata
    {
        public string Description { get; set; }
        public string SiteName { get; set; }
        public string AppId { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string Url { get; set; }
        public string Image { get; set; }

        public bool Empty => string.IsNullOrEmpty(Description) &&
                             string.IsNullOrEmpty(SiteName) &&
                             string.IsNullOrEmpty(AppId) &&
                             string.IsNullOrEmpty(Title) &&
                             string.IsNullOrEmpty(Url) &&
                             string.IsNullOrEmpty(Image);
    }
}
