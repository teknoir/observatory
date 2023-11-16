#!/bin/sh

#export NGINX_BASENAME=${VITE_APP_BASENAME%/}

export NGINX_BASENAME="/${NAMESPACE}/sdmc"
export HISTORIAN_API_HOST="${DOMAIN}/${NAMESPACE}/historian-api"
export SDMC_WSS_MQTT_HOST="https://${DOMAIN}/${NAMESPACE}/ws/sdmc-wss-mqtt"


echo ">>> NGINX_BASENAME: ${NGINX_BASENAME}"
echo ">>> HISTORIAN_API_HOST: ${HISTORIAN_API_HOST}"
echo ">>> SDMC_WSS_MQTT_HOST: ${SDMC_WSS_MQTT_HOST}"


envsubst '$NGINX_BASENAME,$HISTORIAN_API_HOST,$SDMC_WSS_MQTT_HOST' < nginx.conf > /etc/nginx/conf.d/default.conf

cat /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'