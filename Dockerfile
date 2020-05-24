FROM node:12.16.0

WORKDIR /home/node/app/

COPY package.json yarn.* ./

RUN yarn

COPY . .

RUN chmod 777 ./wait-for-it.sh

CMD ["yarn", "start"]
