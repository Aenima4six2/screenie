# Build Phase
FROM node:8.9.3 as builder
WORKDIR /screenie
COPY ./app ./screenie/app
COPY ./server ./screenie/server
RUN cd /screenie/app && yarn && yarn run build && \
    cd /screenie/server && yarn

# Run Phase
FROM node:8.9.3 as runtime
COPY --from=builder /screenie /screenie
WORKDIR /screenie
CMD ["yarn", "run", "start:release"]
EXPOSE 80:80