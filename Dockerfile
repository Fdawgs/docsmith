FROM node:lts

# Workdir
WORKDIR /usr/src/app

# Copy and install packages (will only be production packages if NODE_ENV set to 'production')
COPY src src/
COPY .env package*.json ./
RUN npm ci --ignore-scripts && npm cache clean --force

# Pre-emptively make logs directory if used for logs storage set 
# by LOG_ROTATION_FILENAME env variable 
RUN mkdir ./logs/ && chown -R node ./logs/

# Install binaries
RUN apt-get -q update && \
    apt-get -y install poppler-data poppler-utils unrtf

# Create temp folder for files to be stored whilst being converted
RUN mkdir ./src/temp/ && chown -R node ./src/temp/

# Node images provide 'node' unprivileged user to run apps and prevent
# privilege escalation attacks
USER node
CMD ["node", "."]