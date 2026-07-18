# Build the static site with Astro, serve with nginx.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
# Site URLs baked into the build; overridden by compose for local prod runs.
ARG PUBLIC_KINEGRAM_URL=https://kinegram.3m4.net
ARG PUBLIC_BUBBLES_URL=https://bubbles.3m4.net
ARG PUBLIC_SHORTENER_URL=https://3m4.net
ARG SITE_URL=https://info.3m4.net
ENV PUBLIC_KINEGRAM_URL=$PUBLIC_KINEGRAM_URL \
    PUBLIC_BUBBLES_URL=$PUBLIC_BUBBLES_URL \
    PUBLIC_SHORTENER_URL=$PUBLIC_SHORTENER_URL \
    SITE_URL=$SITE_URL
RUN npm run build

FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
