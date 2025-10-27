using Microsoft.EntityFrameworkCore;
using ThermostatApp.Server.Models;

namespace ThermostatApp.Server.Data
{
    public class ThermostatDbContext : DbContext
    {
        public ThermostatDbContext(DbContextOptions<ThermostatDbContext> options)
            : base(options)
        {
        }

        public DbSet<Reading> Readings { get; set; }
    }
}
