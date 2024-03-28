FROM node:20.9 as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:20.9 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build:production

FROM node:20.9 as runner
WORKDIR /app
ENV NODE_ENV production
# If you are using a custom next.config.mjs file, uncomment this line.
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/.storybook ./.storybook
EXPOSE 3000
CMD ["npm", "start"]
