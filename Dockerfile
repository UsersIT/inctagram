FROM node:18.17 as dependencies
WORKDIR /inctagram
COPY package*.json ./
RUN npm ci

FROM node:18.17 as builder
WORKDIR /inctagram
COPY . .
COPY --from=dependencies /inctagram/node_modules ./node_modules
RUN npm run build

FROM node:18.17 as runner
WORKDIR /inctagram
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /inctagram/next.config.mjs ./
COPY --from=builder /inctagram/public ./public
COPY --from=builder /inctagram/.next ./.next
COPY --from=builder /inctagram/node_modules ./node_modules
COPY --from=builder /inctagram/package.json ./package.json
EXPOSE 3000
CMD ["npm", "run", "dev"]
