FROM node:lts-stretch-slim

# Workdir
WORKDIR /usr/app

# Copy and install packages
COPY . .
# Curl needed for healthcheck command
RUN apt-get -q update && \
    apt-get -y --no-install-recommends install curl=7.52.1-5+deb9u15 poppler-data=0.4.7-8 poppler-utils=0.48.0-2+deb9u4 unrtf=0.21.9-clean-3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    npm ci --ignore-scripts && npm cache clean --force

# Create temp folder for files to be stored whilst being converted
RUN mkdir ./src/temp/ && chown -R node ./src/temp/

# Node images provide 'node' unprivileged user to run apps and prevent
# privilege escalation attacks
USER node
CMD ["node", "."]