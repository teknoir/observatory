


docker build --tag sdmc:dev-1.0.2 . \
    --build-arg "NODE_VERSION=18" \
    --build-arg VITE_APP_BASENAME="feTEKNOIR_APP_BASENAME" \
    --build-arg VITE_WS_SERVER="feTEKNOIR_WS_SERVER" \
    --build-arg VITE_HISTORIAN_DB_SERVER="feTEKNOIR_HISTORIAN_DB_SERVER"


docker run -p 8080:80 -d sdmc:dev-1.0.2 --name sdmc