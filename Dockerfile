FROM node:16.15.1-alpine AS builder
WORKDIR /var/www/app
COPY . .
RUN npm i
RUN yarn build

FROM node:16.15.1-alpine AS production

WORKDIR /var/www/production

COPY --from=builder /var/www/app/package.json /var/www/app/yarn.lock ./

RUN yarn install --production

COPY --from=builder /var/www/app/dist ./dist
COPY --from=builder /var/www/app/server.js ./

EXPOSE 3000

CMD ["node", "./server.js"]
