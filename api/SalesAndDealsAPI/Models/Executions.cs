using SalesAndDealsAPI.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SalesAndDealsAPI.Models
{
    public class Executions
    {
        [Key]
        public int ShopId { get; set; }
        public string Starts { get; set; }
        public string Finished { get; set; }

        public string State { get; set; }

        public Executions(int shopId, string starts, string finished, string state)
        {
            this.ShopId = shopId;
            this.Starts = TimestampToDate.Parse(starts);
            this.Finished = TimestampToDate.Parse(finished);
            this.State = state;
        }
    }
}
