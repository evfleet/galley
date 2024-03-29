FROM node:20.10.0 as base
RUN npm i -g pnpm
RUN mkdir -p /code
RUN chown -R node:node /code && chmod -R 770 /code
WORKDIR /code

FROM base as builder
WORKDIR /code
COPY . .
RUN pnpm install --filter @galley/common @galley/api
RUN pnpm --filter @galley/common @galley/api run build 

FROM base as production
WORKDIR /code
COPY --chown=node:node pnpm-*.yaml .
RUN pnpm fetch
COPY --chown=node:node packages/api ./packages/api
COPY --from=builder /code/packages/common /code/packages/common
COPY --from=builder /code/packages/api /code/packages/api
RUN pnpm install --prod -r --offline
RUN pnpm --filter @galley/api run build
USER node
EXPOSE ${PORT}
CMD ["node", "./packages/api/dist/index.js"]