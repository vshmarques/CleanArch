using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace Backend.Domain;

public static class PasswordEncripty
{
    public static string Encripty(string password)
    {
        byte[] salt = new byte[128 / 8];

        using (var rngCsp = new RSACryptoServiceProvider())
        {
            rngCsp.Encrypt(salt, false);
        }

        return Convert.ToBase64String(KeyDerivation.Pbkdf2(password: password,
                                                           salt: salt,
                                                           prf: KeyDerivationPrf.HMACSHA256,
                                                           iterationCount: 100000,
                                                           numBytesRequested: 256 / 8));
    }
}