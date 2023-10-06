FROM node:20.5.0

WORKDIR /app
COPY . . 

RUN npm i
RUN npx tsc

CMD ["npm", "run", "start"]