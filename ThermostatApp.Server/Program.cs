using Microsoft.EntityFrameworkCore;
using ThermostatApp.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Register EF Core with SQLite using connection string from configuration
builder.Services.AddDbContext<ThermostatDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Enable Swagger/OpenAPI for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Serve static files (React SPA)
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

// Map API controllers
app.MapControllers();

// Fallback to React index.html for client-side routing
app.MapFallbackToFile("/index.html");

app.Run();
