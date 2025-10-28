using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThermostatApp.Server.Data;
using ThermostatApp.Server.Models;

namespace ThermostatApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReadingsController : ControllerBase
    {
        private readonly ThermostatDbContext _context;

        public ReadingsController(ThermostatDbContext context)
        {
            _context = context;
        }

        // GET: api/readings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reading>>> GetReadings()
        {
            return await _context.Readings
                .OrderByDescending(r => r.CreatedAtUtc)
                .ToListAsync();
        }

        // POST: api/readings
        [HttpPost]
        public async Task<ActionResult<Reading>> PostReading(Reading reading)
        {
            reading.CreatedAtUtc = DateTime.UtcNow;
            _context.Readings.Add(reading);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReadings), new { id = reading.Id }, reading);
        }
    }
}
