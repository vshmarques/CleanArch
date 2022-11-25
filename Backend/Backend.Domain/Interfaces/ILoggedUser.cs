namespace Backend.Domain.Interfaces;

public interface ILoggedUser
{
    int id { get; set; }
    string name { get; set; }
    int level { get; set; }
}