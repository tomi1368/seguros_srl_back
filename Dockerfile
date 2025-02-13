FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

COPY .env.prod .env

RUN npx prisma generate 

RUN yarn build

EXPOSE 5000 

CMD ["yarn", "start"]