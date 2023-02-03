## dev

FROM node:14 AS development
WORKDIR /opt/app

ENV NODE_ENV=development
COPY package*.json ./
RUN npm install

COPY ./ ./

CMD ["npm", "run", "dev"]

## prod

FROM node:lts-alpine AS deps
WORKDIR /opt/app
COPY package*.json ./
RUN npm install --omit=dev

###
FROM deps AS builder
WORKDIR /opt/app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /opt/app/node_modules ./node_modules
COPY ./ ./
RUN npm run build

###
FROM deps AS production
WORKDIR /opt/app

ENV HOST=0.0.0.0
ENV NODE_ENV=production
USER node
COPY --chown=node --from=builder /opt/app/node_modules ./
COPY --chown=node --from=builder /opt/app/next.config.js ./
COPY --chown=node --from=builder /opt/app/public ./
COPY --chown=node --from=builder /opt/app/.next ./.next
CMD ["npm", "run", "start"]
