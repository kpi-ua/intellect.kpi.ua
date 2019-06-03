using System.Collections.Generic;

namespace Site.Models
{
    public class HomeViewModel
    {
        public Publication Publication { get; set; }

        public IEnumerable<string> Slides { get; set; }
    }
}
