FROM node:22-alpine
WORKDIR /usr/local/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "./omega_crm_server/index.js"]