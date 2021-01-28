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
        public int Country_id { get; set; }
        public string Name { get; set; }
        public string CountryCode { get; set; }

        public Country()
        {
        }
        public Country(int country_id, string name, string countryCode)
        {
            this.Country_id = country_id;
            this.Name = name;
            this.CountryCode = countryCode;
        }
    }
}
