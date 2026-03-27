using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// --- 1. SERVICES SECTION (Adding tools to the container) ---

builder.Services.AddControllers();

// Add SQLite Connection
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add CORS Service (Neil does this around Video 23)
builder.Services.AddCors();

var app = builder.Build();

// --- 2. MIDDLEWARE SECTION (The order of these lines is critical!) ---

// Configure the HTTP request pipeline.

// Add the CORS Middleware BEFORE MapControllers
app.UseCors(x => x.AllowAnyHeader()
                  .AllowAnyMethod()
                  .WithOrigins("http://localhost:4200", "https://localhost:4200"));

app.MapControllers();

app.Run();