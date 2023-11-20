# Build stage
FROM node:14 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run stage
FROM nginx:alpine

# Set the API_BASE_URL environment variable
ENV API_BASE_URL="https://dev-api.campus.cloud.kpi.ua"

COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]