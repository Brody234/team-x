# Build phase
FROM node:18-alpine AS build

WORKDIR /app

COPY ./.next /app/.next

COPY ./package.json /app

COPY ./package-lock.json /app

RUN npm install

# Run phase
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "start"]