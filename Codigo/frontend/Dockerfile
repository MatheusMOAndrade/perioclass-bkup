FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN yarn

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev", "-p 80"]
