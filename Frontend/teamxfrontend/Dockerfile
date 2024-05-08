# # Build phase
FROM node:18-alpine AS build

WORKDIR /app

# COPY ./.next /app/.next

COPY ./package.json /app

COPY ./package-lock.json /app

RUN npm install


FROM build AS development

WORKDIR /app/src

COPY --from=build /app /app

# move package.json and package-lock.json in the container to the working directory
COPY ./package.json /app/src
COPY ./package-lock.json /app/src

EXPOSE 3000

CMD ["npm", "run", "dev"]


FROM build AS production

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "run", "start"]
