FROM node:10.16-alpine as develop-stage
WORKDIR /app
# COPY /package*.json ./
# RUN npm ci
# COPY /app .
# CMD npm run dev

# build stage
# FROM develop-stage as build-stage
# RUN yarn build# production stage

# FROM nginx:1.15.7-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]