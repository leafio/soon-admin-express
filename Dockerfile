FROM node:alpine AS build

WORKDIR /app

COPY . .

RUN rm -f ./package-lock.json
RUN rm -f ./package.json

ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com/

RUN npm install @prisma/client
RUN npx prisma generate

# CMD node --env-file=.env.production ./dist/index.js

FROM node:alpine 
WORKDIR /app
COPY --from=build /app .

ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com/

RUN npm install pm2@latest -g

CMD ["pm2-runtime", "node --env-file=.env.production ./dist/index.js"]
