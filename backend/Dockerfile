FROM node:16.13.2-alpine

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install

COPY . /app
EXPOSE 3000

CMD [ "npm", "start" ]