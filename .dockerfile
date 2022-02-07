FROM node:lts-buster as builder
RUN corepack enable


# set working directory
WORKDIR /app

# copy everything over to Docker environment
COPY ./src ./

RUN yarn install
RUN yarn build

# production
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
