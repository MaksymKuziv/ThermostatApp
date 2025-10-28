using System.ComponentModel.DataAnnotations;

namespace ThermostatApp.Server.Dtos
{
    public class ReadingCreateDto
    {
        [Required]
        public double? TemperatureC { get; set; }

        [MaxLength(100)]
        public string? Location { get; set; }

        [MaxLength(500)]
        public string? Notes { get; set; }
    }
}