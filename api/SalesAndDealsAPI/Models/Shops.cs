using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SalesAndDealsAPI.Helpers;

namespace SalesAndDealsAPI.Models
{
    public class Shops
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }
        public int ActiveOffers { get; set; }
        public string LastExecuted { get; set; }
        public string ExecutionState { get; set; }
        public int AssignedTo { get; set; }
        public string DexiRun { get; set; }
        public string DexiRobot { get; set; }
        public int Rank { get; set; }
        public string Category { get; set; }
        public int NotesAmount { get; set; }
        public string InputUrl { get; set; }


        public Shops(int id, string name, int countryId, int activeOffers, string lastExecuted, string executionState, int assignedTo, string dexiRun, string DexiRobot, int rank, string category, int notesAmount, string inputUrl)
        {
            this.Id = id;
            this.Name = name;
            this.CountryId = countryId;
            this.ActiveOffers = activeOffers;
            this.LastExecuted = lastExecuted;
            this.ExecutionState = executionState;
            this.AssignedTo = assignedTo;
            this.DexiRun = dexiRun;
            this.DexiRobot = DexiRobot;
            this.Rank = rank;
            this.Category = category;
            this.NotesAmount = notesAmount;
            this.InputUrl = inputUrl;
        }

    }

}
