#!/usr/bin/env bash

docker network create keycloak-network

docker run -d   --name postgres \
                --net keycloak-network \
                -e POSTGRES_DB=keycloak \
                -e POSTGRES_USER=keycloak \
                -e POSTGRES_PASSWORD=password \
                postgres


docker run  -e KEYCLOAK_USER=admin \
            -e KEYCLOAK_PASSWORD=admin \
            -e DB_VENDOR=h2 \
            --net keycloak-network \
            jboss/keycloak