# Build 
ARG NODE_VERSION

FROM node:${NODE_VERSION}-slim AS build

WORKDIR /app

COPY . .

# Default everything
ARG VITE_APP_BASENAME
ARG VITE_HISTORIAN_DB_SERVER
ARG VITE_WS_SERVER
ARG VITE_HISTORIAN_MIDDLE_END_API
ENV VITE_APP_BASENAME=${VITE_APP_BASENAME}
ENV VITE_WS_SERVER=${VITE_WS_SERVER}
ENV VITE_HISTORIAN_DB_SERVER=${VITE_HISTORIAN_DB_SERVER}
ENV VITE_HISTORIAN_MIDDLE_END_API=${VITE_HISTORIAN_MIDDLE_END_API}

RUN npm install && \
    npm run build

# Runtime 
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf .
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["./entrypoint.sh"]
