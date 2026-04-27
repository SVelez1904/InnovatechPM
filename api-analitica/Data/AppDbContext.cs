using Microsoft.EntityFrameworkCore;
using api_analitica.Models;

namespace api_analitica.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Aquí defines tus tablas (DbSet)
        public DbSet<ProyectoReporte> Reportes { get; set; }
    }
}