FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
RUN npm install -g serve

ENV NODE_ENV production
EXPOSE 3000

CMD ["serve", "build"]
