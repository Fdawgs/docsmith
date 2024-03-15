FROM node:20-bullseye-slim

# Workdir
WORKDIR /usr/app

# Create temp folder for files to be stored whilst being converted
RUN mkdir -p ./dist/temp/

# Install OS dependencies
# Curl needed for healthcheck command
RUN apt-get -q update &&\
    apt-get -y --no-install-recommends install curl poppler-data poppler-utils unrtf && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy and install node dependencies
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --omit=dev && \
    npm pkg delete commitlint devDependencies jest nodemonConfig scripts && \
    npm cache clean --force && \
    chmod 100 ./node_modules/htmltidy2/bin/linux64/tidy && \
    # Remove included Windows and macOS binaries
    rm -rf ./node_modules/node-poppler/src/lib/* && \
    rm -rf ./node_modules/node-unrtf/src/lib/* && \
    rm -rf ./node_modules/htmltidy2/bin/win64 && \
    rm -rf ./node_modules/htmltidy2/bin/darwin

# Copy source
COPY . .
# Change ownership of all files and directories
RUN chown -R node:node .

# Node images provide 'node' unprivileged user to run apps and prevent
# privilege escalation attacks
USER node
CMD ["node", "."]
