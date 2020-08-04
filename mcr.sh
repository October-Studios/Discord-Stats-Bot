#!/bin/bash

auth_server=https://authserver.mojang.com
user=crhowell3@gmail.com
password=Tuaman13!
client_token=kobeisabitch

response=$(http --check-status --ignore-stdin POST ${auth_server}/authenticate username=${user} password=${password clientToken=${client_token}} agent:='{"name": "Minecraft", "version": 1}')

access_token=$(echo ${response} | jq .accessToken | sed 's/"//g')

realms_server=https://pc.realms.minecraft.net
uuid=9f5b28502c67451b9ab20329791bbc60
user_id=Orionium
version=1.16.1

http --verbose GET ${realms_server}/activities/liveplayerlist "Cookie:sid_token:${access_token}:${uuid};user=${user_id};version=${version}"