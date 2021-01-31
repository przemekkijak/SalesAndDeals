using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace SalesAndDealsAPI.Models
{
    public class Shops
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }
        public int ActiveOffers { get; set; }
        public string ModifiedByName { get; set; }
        public string LastModified { get; set; }
        public string LastExecuted { get; set; }
        public int AssignedTo { get; set; }
        public string DexiId { get; set; }
        public int Rank { get; set; }
        public string Category { get; set; }
        public int NotesAmount { get; set; }


        public Shops(int id, string name, int countryId, int activeOffers, string modifiedByName, string lastModified, string lastExecuted, int assignedTo, string dexiId, int rank, string category, int notesAmount)
        {
            this.Id = id;
            this.Name = name;
            this.CountryId = countryId;
            this.ActiveOffers = activeOffers;
            this.ModifiedByName = modifiedByName;
            this.LastModified = ParseDate(lastModified);
            this.LastExecuted = ParseDate(lastExecuted);
            this.AssignedTo = assignedTo;
            this.DexiId = dexiId;
            this.Rank = rank;
            this.Category = category;
            this.NotesAmount = notesAmount;
        }

        private static string ParseDate(string timestamp)
        {
            System.DateTime dt = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dt = dt.AddMilliseconds(Double.Parse(timestamp)).ToLocalTime();
            string[] parsed = dt.ToString().Split(" ")[0].Split("/");
            return $"{parsed[1]}/{parsed[0]}/{parsed[2]}";
        }

    }

}
