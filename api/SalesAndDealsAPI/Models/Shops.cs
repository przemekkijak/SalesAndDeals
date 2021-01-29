using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace SalesAndDealsAPI.Models
{
    public class Shops
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Country_id { get; set; }
        public int ActiveOffers { get; set; }
        public string ModifiedByName { get; set; }
        [DataType(DataType.Date)]
        public DateTime LastModified { get; set; }
        [DataType(DataType.Date)]
        public DateTime LastExecuted { get; set; }
        [DataType(DataType.Date)]
        public int AssignedTo { get; set; }
        public string dexiId { get; set; }
    }
}
