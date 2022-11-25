using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs;

public class AuthRequest
{
    [Required]
    public string? username { get; set; }

    [Required]
    public string? password { get; set; }
}

public class AuthResponse
{
    public string? token { get; set; }

    [Required]
    public string? message { get; set; }
}

public class PasswordChangeRequest
{
    [Required]
    public string? oldPassword { get; set; }

    [Required]
    public string? newPassword { get; set; }
}