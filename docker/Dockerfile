FROM mcr.microsoft.com/dotnet/core/aspnet:3.1.1-buster-slim

WORKDIR /
COPY ./out/ ./

ENTRYPOINT ["dotnet", "Site.dll"]