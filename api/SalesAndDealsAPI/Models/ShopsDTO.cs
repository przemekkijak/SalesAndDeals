using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesAndDealsAPI.Models
{
    public class ShopsDTO
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string LastExecuted { get; set; }
        public string ExecutionState { get; set; }
        public string DexiRun { get; set; }
        public string DexiRobot { get; set; }
        public string InputUrl { get; set; }

        public ShopsDTO(Shops shop)
        {
            this.Id = shop.Id;
            this.LastExecuted = shop.LastExecuted;
            this.ExecutionState = shop.ExecutionState;
            this.DexiRun = shop.DexiRun;
            this.DexiRobot = shop.DexiRobot;
            this.InputUrl = shop.InputUrl;
        }

    }
}
