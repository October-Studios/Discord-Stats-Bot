#!/bin/bash
realms_server=https://pc.realms.minecraft.net
version=1.16.2

cookie_string="Cookie:sid=token:${access_token}:${id};user=${name};version=${version}"

# 1. get world ID
response=$(http --check-status --ignore-stdin --verify=no GET ${realms_server}/worlds "${cookie_string}")

owner=$(echo ${response} | jq -r .servers[0].owner)
daysLeft=$(echo ${response} | jq -r servers[0].daysLeft)
serverName=$(echo ${response} | jq -r servers[0].name)
state=$(echo ${response} | jq -r servers[0].state)
online=$(echo ${response} | jq -r servers[0].players) 

echo "$owner\n$daysLeft\n$serverName\n$state\n$online"
