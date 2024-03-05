FROM node:20.9 as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN npm install

FROM node:20.9 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
COPY src ./src
COPY public ./public
COPY pages ./pages
COPY styles ./styles
COPY stories .stories
COPY package.json next.config.mjs tsconfig.json ./
RUN npm run build

FROM node:20.9 as runner
WORKDIR /app
#ENV NODE_ENV production
## If you are using a custom next.config.js file, uncomment this line.
#COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
#EXPOSE 3000
CMD ["npm", "run", "start"]
