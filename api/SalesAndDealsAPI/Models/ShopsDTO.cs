using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesAndDealsAPI.Models
{
    public class ShopsDTO
    {

        public int ShopId { get; set; }
        public string Name { get; set; }
        public DateTime? LastExecuted { get; set; }
        public string ExecutionState { get; set; }
        public string DexiRun { get; set; }
        public string DexiRobot { get; set; }
        public string InputUrl { get; set; }
        public int AssignedTo { get; set; }
        public string RobotState { get; set; }
        public string LastModifiedByName { get; set; }
        public DateTime? LastChanged { get; set; }
        public int UsingProxy { get; set; }
        public Tag Tag { get; set; }

        public ShopsDTO(Shops shop)
        {
            this.ShopId = shop.ShopId;
            this.LastExecuted = shop.LastExecuted;
            this.ExecutionState = shop.ExecutionState;
            this.DexiRun = shop.DexiRun;
            this.DexiRobot = shop.DexiRobot;
            this.InputUrl = shop.InputUrl;
            this.AssignedTo = shop.AssignedTo;
            this.RobotState = shop.RobotState;
            this.LastModifiedByName = shop.LastModifiedByName;
            this.UsingProxy = shop.UsingProxy;
            this.LastChanged = shop.LastChanged;
        }

    }
}
