using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace SalesAndDealsAPI.Models
{
    public class Scraper
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string CreatedByName { get; set; }
        public string Country { get; set; }
        public int ActiveOffers { get; set; }
        public string ModifiedByName { get; set; }
        [DataType(DataType.Date)]
        public DateTime LastModified { get; set; }
        [DataType(DataType.Date)]
        public DateTime LastExecuted { get; set; }
        [DataType(DataType.Date)]
        public DateTime LastFailed { get; set; }
        public int AssignedTo { get; set; }
    }
}
