FROM node:18.17 as dependencies
WORKDIR /pages
COPY package*.json ./
RUN npm ci

FROM node:18.17 as builder
WORKDIR /pages
COPY . .
COPY --from=dependencies  /node_modules ./node_modules
RUN npm run build

FROM node:18.17 as runner
WORKDIR /pages
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder ./next.config.mjs ./
#COPY --from=builder /app/public ./public
COPY --from=builder /.next ./.next
COPY --from=builder /node_modules ./node_modules
COPY --from=builder /package.json ./package.json
EXPOSE 3000
CMD ["npm", "run", "dev"]
