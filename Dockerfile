# Lightweight Nginx for serving static files
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx/static.conf /etc/nginx/conf.d/default.conf

# Copy static files from Eleventy build
COPY dist/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
