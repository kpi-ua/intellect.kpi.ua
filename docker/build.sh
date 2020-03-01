#!/bin/bash

project='intellect-kpi-ua'
now=`date +%Y%m%d%H%M%S`
root_dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)/../

github_organization='docker.pkg.github.com/kpi-ua/intellect.kpi.ua'
github_registry_url='docker.pkg.github.com'
github_registry_username=$1
github_registry_pwd=$2

dockerhub_organization='kpiua'
dockerhub_registry_url='registry-1.docker.io'
dockerhub_registry_username=$3
dockerhub_registry_pwd=$4

clear

push_to_docker_registry()  {
    local organization=$1
    local project=$2
    local tag=$3
    local registry_url=$4
    local registry_username=$5
    local registry_pwd=$6

    echo "Docker Auth ${registry_url}"
    
    docker login -u $registry_username -p $registry_pwd $registry_url

    echo "Push Docker images ${registry_url}"

    docker tag $project:$tag $organization/$project:$tag
    docker push $organization/$project:$tag
}

#################################################################################

echo "Build project"

cd $root_dir

dotnet build ./src/Site/Site.csproj --configuration Release
dotnet publish ./src/Site/Site.csproj --configuration Release -o ./docker/out
rm ./docker/out/appsettings.Development.json

#################################################################################

cd $root_dir/docker

echo "Build docker images"

docker build ./ --file ./.dockerfile --tag $project:$now --tag $project:latest

echo "Publish docker images"

push_to_docker_registry $github_organization $project $now $github_registry_url $github_registry_username $github_registry_pwd
push_to_docker_registry $github_organization $project latest $github_registry_url $github_registry_username $github_registry_pwd
push_to_docker_registry $dockerhub_organization $project $now $dockerhub_registry_url $dockerhub_registry_username $dockerhub_registry_pwd
push_to_docker_registry $dockerhub_organization $project latest $dockerhub_registry_url $dockerhub_registry_username $dockerhub_registry_pwd

echo "Done"