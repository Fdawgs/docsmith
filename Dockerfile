FROM node:lts-alpine

WORKDIR /usr/src/app
COPY . .

# Pre-emptively make logs directory if used for logs storage set 
# by LOG_ROTATION_FILENAME env variable 
RUN mkdir ./logs/
RUN chown -R node ./logs/
# If appropriate env file missing, use template
RUN cp .env.template .env

RUN npm ci --ignore-scripts && npm cache clean --force

# Node images provide 'node' unprivileged user to run apps and prevent
# privilege escalation attacks
USER node
CMD ["node", "."]