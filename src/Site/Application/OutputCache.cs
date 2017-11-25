using System;

namespace Site
{
    public class OutputCache : Attribute
    {
        public int Duration { get; set; }

        public string VaryByParam { get; set; }
    }
}