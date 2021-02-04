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

        public static DateTime Parse(string timestamp)
        {
            System.DateTime dt = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dt = dt.AddMilliseconds(Double.Parse(timestamp)).ToLocalTime();
            return dt;
        }
    }
}
