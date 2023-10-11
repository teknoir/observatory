ARG NODE_VERSION

FROM node:${NODE_VERSION}-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 5173

# Run the application
CMD ["npm", "run", "dev"]