using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SalesAndDealsAPI.Models
{
    public class ShopNotesDTO
    {
        public int Id { get; set; }
        public int ShopId { get; set; }
        public string Shop { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public string RobotState { get; set; }
        public int AssignedTo { get; set; }

        public ShopNotesDTO(ShopNotes note)
        {
            this.Id = note.Id;
            this.ShopId = note.ShopId;
            this.Author = note.Author;
            this.Content = note.Content;
            this.CreatedAt = note.CreatedAt;
        }
    }
}
