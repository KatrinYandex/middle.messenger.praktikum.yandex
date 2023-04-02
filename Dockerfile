FROM node:16.15.1-alpine
WORKDIR /var/www/app
COPY . .
#RUN yarn start
#RUN yarn build
RUN npm i
EXPOSE 3000
CMD ["npm", "run", "start"]
