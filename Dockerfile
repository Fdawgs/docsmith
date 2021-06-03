FROM node:lts-buster-slim

# Workdir
WORKDIR /usr/app

# Copy and install packages
COPY . .
# Curl needed for healthcheck command
RUN apt-get -q update && \
    apt-get -y --no-install-recommends install curl=7.64.0-4+deb10u2 poppler-data=0.4.9-2 poppler-utils=0.71.0-5 unrtf=0.21.10-clean-1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    npm ci --ignore-scripts && npm cache clean --force

# Create temp folder for files to be stored whilst being converted
RUN mkdir ./src/temp/ && chown -R node ./src/temp/

# Node images provide 'node' unprivileged user to run apps and prevent
# privilege escalation attacks
USER node
CMD ["node", "."]