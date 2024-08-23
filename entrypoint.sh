#!/bin/sh

export feTEKNOIR_APP_BASENAME="${NAMESPACE}/sdmc"
export feTEKNOIR_WS_SERVER="wss://${DOMAIN}/${NAMESPACE}/ws/sdmc-wss-mqtt"
export feTEKNOIR_HISTORIAN_DB_SERVER="${DOMAIN}/${NAMESPACE}/historian-api"
export feTEKNOIR_HISTORIAN_MIDDLE_END_API="${DOMAIN}/${NAMESPACE}/historian-middleend"
export feTEKNOIR_MEDIA_MP4_API="${DOMAIN}/${NAMESPACE}/media-service/api/mp4"
export feTEKNOIR_MEDIA_JPEG_API="${DOMAIN}/${NAMESPACE}/media-service/api/jpeg"
export feTEKNOIR_MEDIA_JSON_API="${DOMAIN}/${NAMESPACE}/media-service/api/json"
export NGINX_BASENAME="/${NAMESPACE}/sdmc"

echo ">>> basename: ${feTEKNOIR_APP_BASENAME}"
echo ">>> websocket server: ${feTEKNOIR_WS_SERVER}"
echo ">>> historian DB server: ${feTEKNOIR_HISTORIAN_DB_SERVER}"
echo ">>> historian middle end server: ${feTEKNOIR_HISTORIAN_MIDDLE_END_API}"
echo ">>> media mp4 server: ${feTEKNOIR_MEDIA_MP4_API}"
echo ">>> media jpeg server: ${feTEKNOIR_MEDIA_JPEG_API}"
echo ">>> media json server: ${feTEKNOIR_MEDIA_JSON_API}"

find /usr/share/nginx/html -type f -exec sed -i "s|feTEKNOIR_NAMESPACE|${NAMESPACE}|g" '{}' +
find /usr/share/nginx/html -type f -exec sed -i "s|feTEKNOIR_APP_BASENAME|${feTEKNOIR_APP_BASENAME}|g" '{}' +
find /usr/share/nginx/html -type f -exec sed -i "s|feTEKNOIR_WS_SERVER|${feTEKNOIR_WS_SERVER}|g" '{}' +
find /usr/share/nginx/html -type f -exec sed -i "s|feTEKNOIR_HISTORIAN_DB_SERVER|${feTEKNOIR_HISTORIAN_DB_SERVER}|g" '{}' +
find /usr/share/nginx/html -type f -exec sed -i "s|feTEKNOIR_HISTORIAN_MIDDLE_END_API|${feTEKNOIR_HISTORIAN_MIDDLE_END_API}|g" '{}' +
find /usr/share/nginx/html -type f -exec sed -i "s|feTEKNOIR_MEDIA_MP4_API|${feTEKNOIR_MEDIA_MP4_API}|g" '{}' +
find /usr/share/nginx/html -type f -exec sed -i "s|feTEKNOIR_MEDIA_JPEG_API|${feTEKNOIR_MEDIA_JPEG_API}|g" '{}' +
find /usr/share/nginx/html -type f -exec sed -i "s|feTEKNOIR_MEDIA_JSON_API|${feTEKNOIR_MEDIA_JSON_API}|g" '{}' +

envsubst '$NGINX_BASENAME' < nginx.conf > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
