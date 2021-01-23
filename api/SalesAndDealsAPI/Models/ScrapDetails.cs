using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesAndDealsAPI.Models
{
    public class ScrapDetails
    {
        public Scrapdev DevDetails { get; set; }
        public int ScrapersMadeCounter { get; set; }

        public ScrapDetails(Scrapdev dev, int counter)
        {
            this.DevDetails = dev;
            this.ScrapersMadeCounter = counter;
        }
    }

}
