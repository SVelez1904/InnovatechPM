namespace api_analitica.Models;

public class ProyectoReporte
{
    public int Id { get; set; }
    public string NombreProyecto { get; set; }
    public double Progreso { get; set; }
    public DateTime FechaCalculo { get; set; }
}