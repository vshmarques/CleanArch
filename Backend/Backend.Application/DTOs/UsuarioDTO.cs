namespace Backend.Application.DTOs;

public class UsuarioDTO
{
    public int Id { get; set; }

    public string? Nome { get; set; }

    public string? Email { get; set; }

    public int Nivel { get; set; } = 1;

    public bool Bloqueado { get; set; } = false;
}

public class UsuarioCreateDTO
{
    public string? Nome { get; set; }

    public string? Email { get; set; }

    public string? Senha { get; set; }

    public int Nivel { get; set; }

    public bool Bloqueado { get; set; }
}