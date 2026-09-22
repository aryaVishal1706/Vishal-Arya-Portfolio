FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY Script.js /usr/share/nginx/html/Script.js

EXPOSE 80
