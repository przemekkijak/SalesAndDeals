using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace SalesAndDealsAPI.Models
{
    public class Country
    {
        [Key]
        public int CountryId { get; set; }
        public string Name { get; set; }
        public string CountryCode { get; set; }

        public Country()
        {
        }
        public Country(int countryId, string name, string countryCode)
        {
            this.CountryId = countryId;
            this.Name = name;
            this.CountryCode = countryCode;
        }
    }
}
