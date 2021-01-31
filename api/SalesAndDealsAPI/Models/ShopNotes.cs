using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;



namespace SalesAndDealsAPI.Models
{
    public class ShopNotes
    {
        public int Id { get; set; }
        public int ShopId { get; set; }
        public string Author { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }
        public string Contents { get; set; }
    }
}
