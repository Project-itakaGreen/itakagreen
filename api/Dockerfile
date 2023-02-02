FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --save
COPY ./ ./
RUN npm run build

FROM node:18-alpine as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --save
COPY ./ ./

FROM node:18-alpine as production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
RUN npm cache clean --force
RUN npm install --only=production
CMD ["node", "dist/main"]