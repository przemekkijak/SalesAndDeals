using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesAndDealsAPI.Models
{
    public class Result
    {
        public int Id { get; set; }
        public int ShopId { get; set; }
        public string Name { get; set; }
        public string Source { get; set; }
        public string Images { get; set; }
        public string Pdf { get; set; }
        public string Error { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }

    }
}
