using Microsoft.EntityFrameworkCore;
using api_analitica.Data; // Ajusta al nombre de tu namespace
using api_analitica.Services;

var builder = WebApplication.CreateBuilder(args);

// --- 1. REGISTRO DE SERVICIOS (Antes del Build) ---

// Configurar Controladores (Esto permite usar la carpeta /Controllers)
builder.Services.AddControllers();

// Configurar OpenAPI/Swagger
builder.Services.AddOpenApi();

// Configurar la conexión a PostgreSQL en Docker
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Registrar tus servicios de lógica de negocio (Inyección de Dependencias)
builder.Services.AddScoped<IAnaliticaService, AnaliticaService>();

var app = builder.Build();

// --- 2. CONFIGURACIÓN DEL PIPELINE (Después del Build) ---

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    // Opcional: Si quieres la interfaz visual de Swagger, podrías necesitar app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// IMPORTANTE: Esto le dice a .NET que busque los archivos en la carpeta /Controllers
app.MapControllers();

// Puedes borrar el código del "WeatherForecast" que venía por defecto 
// para que tu archivo quede limpio.

app.Run();