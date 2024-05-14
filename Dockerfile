# ------------------
# Temp image
# ------------------
FROM node:20-bullseye-slim AS tmp

# Workdir
WORKDIR /usr/app/tmp

# Copy and install dependencies separately from the app's code
# to take advantage of Docker's layer caching
# See: https://docs.docker.com/build/cache/#optimizing-how-you-use-the-build-cache
COPY package.json .
COPY package-lock.json .
RUN npm ci --ignore-scripts --omit=dev && \
    npm pkg delete commitlint devDependencies jest scripts && \
    npm cache clean --force && \
    chmod 100 ./node_modules/htmltidy2/bin/linux64/tidy && \
    # Remove included Windows and macOS binaries
    rm -rf ./node_modules/node-poppler/src/lib/* && \
    rm -rf ./node_modules/node-unrtf/src/lib/* && \
    rm -rf ./node_modules/htmltidy2/bin/win64 && \
    rm -rf ./node_modules/htmltidy2/bin/darwin

# Copy source
COPY . .

# Create temp folder for files to be stored whilst being converted
RUN mkdir -p ./temp/

# ------------------
# Final image
# ------------------
FROM node:20-bullseye-slim AS main

# Workdir
WORKDIR /usr/app

# Install OS dependencies
# Curl needed for healthcheck command
RUN apt-get -q update &&\
    apt-get -y --no-install-recommends install curl poppler-data poppler-utils unrtf && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy files from tmp image and change ownership
COPY --from=tmp --chown=node:node /usr/app/tmp /usr/app

# Node images provide 'node' unprivileged user to run apps and prevent
# privilege escalation attacks
USER node
CMD ["node", "."]
