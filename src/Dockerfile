# Build Phase
FROM node:8.9.3 as builder
COPY ./app /screenie/app
COPY ./server /screenie/server
RUN rm -rf /screenie/app/node_modules && \
    rm -rf /screenie/server/node_modules && \
    cd /screenie/app && yarn && yarn run build:server && \
    cd /screenie/server && yarn

# Run Phase
FROM node:8.9.3 as runtime
COPY --from=builder /screenie /screenie
WORKDIR /screenie/server
CMD ["yarn", "run", "start:release"]
EXPOSE 80:80