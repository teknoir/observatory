#!/bin/sh

export NGINX_BASENAME=${VITE_APP_BASENAME%/}

echo ">>> NGINX_BASENAME: ${NGINX_BASENAME}"

envsubst '$NGINX_BASENAME' < nginx.conf > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'