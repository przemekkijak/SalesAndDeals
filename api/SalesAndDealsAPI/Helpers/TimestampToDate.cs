using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesAndDealsAPI.Helpers
{
    public class TimestampToDate
    {
        public string Timestamp { get; set; }

        public TimestampToDate(string timestamp)
        {
            this.Timestamp = timestamp;
        }

        public static string Parse(string timestamp)
        {
            System.DateTime dt = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dt = dt.AddMilliseconds(Double.Parse(timestamp)).ToLocalTime();
            string[] parsed = dt.ToString().Split(" ")[0].Split("/");
            parsed[1] = (int.Parse(parsed[1]) < 10) ? $"0{parsed[1]}" : parsed[1];
            parsed[2] = (int.Parse(parsed[2]) < 10) ? $"0{parsed[2]}" : parsed[2];
            return $"{parsed[1]}/{parsed[0]}/{parsed[2]}";
        }
    }
}
