FROM mcr.microsoft.com/dotnet/core/aspnet:3.1.2-alpine

WORKDIR /app
COPY ./out/ ./

ENTRYPOINT ["dotnet", "Site.dll"]