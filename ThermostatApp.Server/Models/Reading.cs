using System.ComponentModel.DataAnnotations;

namespace ThermostatApp.Server.Models
{
    public class Reading
    {
        public int Id { get; set; }

        [Required]
        public double TemperatureC { get; set; }

        [Required]
        public DateTime CreatedAtUtc { get; set; }

        [MaxLength(100)]
        public string? Location { get; set; }

        [MaxLength(500)]
        public string? Notes { get; set; }
    }
}
