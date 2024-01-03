FROM node:20.10.0 as base
RUN npm i -g pnpm
RUN mkdir -p /code
RUN chown -R node:node /code && chmod -R 770 /code
WORKDIR /code

FROM base as develop
WORKDIR /code
COPY --chown=node:node pnpm-*.yaml .
RUN pnpm fetch
COPY --chown=node:node packages/api ./packages/api
RUN pnpm install -r --offline
USER node
CMD ["pnpm", "--filter=@galley/api", "run", "dev"]

