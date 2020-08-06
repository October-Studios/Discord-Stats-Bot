#!/bin/bash

user="crhowell3@gmail.com"
password="Tuaman13!"

auth_server=https://authserver.mojang.com
client_token=github.com/air/minecraft-tools

response=$(http --check-status --ignore-stdin POST ${auth_server}/authenticate username=${user} password=${password} clientToken=${client_token} agent:='{"name": "Minecraft", "version": 1}')
 if [ $? -ne 0 ];then
  echo "Error authenticating, response: ${response}"
  return 1
fi

# parse details from the JSON response
access_token=$(echo ${response} | jq -r .accessToken)
name=$(echo ${response} | jq -r .selectedProfile.name)
id=$(echo ${response} | jq -r .selectedProfile.id)

realms_server=https://pc.realms.minecraft.net
version=1.16.2

cookie_string="Cookie:sid=token:${access_token}:${id};user=${name};version=${version}"

# 1. get world ID
response=$(http --check-status --ignore-stdin --verify=no GET ${realms_server}/worlds "${cookie_string}")

owner=$(echo ${response} | jq -r .servers[0].owner)
daysLeft=$(echo ${response} | jq -r .servers[0].daysLeft)
serverName=$(echo ${response} | jq -r .servers[0].name)
state=$(echo ${response} | jq -r .servers[0].state)
online=$(echo ${response} | jq -r .servers[0].players) 

echo "${owner} ${daysLeft} ${serverName} ${state} ${online}"
