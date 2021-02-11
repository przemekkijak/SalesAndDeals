﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SalesAndDealsAPI.Models
{
    public class ProblemTag
    {
        [Key]
        public string Name { get; set;}
        public string Description { get; set; }
        public string Color { get; set; }
    }
}
