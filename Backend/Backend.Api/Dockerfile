#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Backend/Backend.Api/Backend.Api.csproj", "Backend/Backend.Api/"]
COPY ["Backend/Backend.Infra.IoC/Backend.Infra.IoC.csproj", "Backend/Backend.Infra.IoC/"]
COPY ["Backend/Backend.Application/Backend.Application.csproj", "Backend/Backend.Application/"]
COPY ["Backend/Backend.Domain/Backend.Domain.csproj", "Backend/Backend.Domain/"]
COPY ["Backend/Backend.Infra.Data/Backend.Infra.Data.csproj", "Backend/Backend.Infra.Data/"]
RUN dotnet restore "Backend/Backend.Api/Backend.Api.csproj"
COPY . .
WORKDIR "/src/Backend/Backend.Api"
RUN dotnet build "Backend.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Backend.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Backend.Api.dll"]