FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /backend
EXPOSE 80
EXPOSE 443
# Copy everything
COPY *.csproj ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
COPY . ./
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/sdk:6.0 AS final-env
WORKDIR /backend
COPY --from=build-env /backend/out .

ENTRYPOINT [ "dotnet", "mpp1.dll" ]
