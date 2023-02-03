FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install --omit=dev
COPY ./ ./
RUN npm run build

FROM node:18-alpine as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --save
COPY ./ ./
CMD ["npm", "run", "dev"]

FROM node:18-alpine as production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
CMD ["npm", "run", "start"]