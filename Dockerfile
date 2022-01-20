FROM node:16-alpine

WORKDIR /usr/wingu

COPY ["package.json", "tsconfig.json", ".eslintrc.json", ".prettierrc.json", "./"]

RUN npm install

COPY src /usr/wingu/src

RUN ls -lah

EXPOSE 4000

CMD ["npm", "run", "dev"]