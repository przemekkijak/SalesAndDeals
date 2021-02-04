﻿using System;
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
        public DateTime? LastExecuted { get; set; }
        public string ExecutionState { get; set; }
        public int AssignedTo { get; set; }
        public string DexiRun { get; set; }
        public string DexiRobot { get; set; }
        public int Rank { get; set; }
        public string Category { get; set; }
        public int NotesAmount { get; set; }
        public string InputUrl { get; set; }
        public string RobotState { get; set; }


    }

}
