## dev
FROM node:14 AS development
WORKDIR /opt/app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "dev"]

###
FROM node:lts-alpine AS builder
WORKDIR /opt/app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY ./package*.json ./
RUN npm install --omit=dev
COPY ./ ./
RUN npm run build

###
FROM node:lts-alpine AS production
WORKDIR /opt/app
ENV HOST=0.0.0.0
ENV NODE_ENV=production
RUN npm install -g next
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next

COPY --from=builder /opt/app/next.config.js ./
COPY --from=builder /opt/app/package*.json ./

CMD ["npm", "run", "start"]
