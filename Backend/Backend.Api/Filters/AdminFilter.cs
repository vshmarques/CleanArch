using Backend.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Dynamic;

namespace Backend.Api.Filters;

public class AdminFilter : Attribute, IAuthorizationFilter
{
    ILoggedUser? _loggedUser;

    public AdminFilter(ILoggedUser loggedUser)
    {
        _loggedUser = loggedUser;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        dynamic response = new ExpandoObject();
        response.message = "Acesso não autorizado. Verifique seu token.";

        if (_loggedUser?.level == null)
        {
            context.Result = new JsonResult(response) { StatusCode = StatusCodes.Status401Unauthorized };
            return;
        }

        if (!_loggedUser!.level.Equals(9))
        {
            context.Result = new JsonResult(response) { StatusCode = StatusCodes.Status401Unauthorized };
            return;
        }
    }
}