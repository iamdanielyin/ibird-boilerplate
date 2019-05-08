FROM node:carbon-alpine

RUN rm -f /etc/apk/repositories \
    && echo "http://mirrors.aliyun.com/alpine/v3.9/main/" >> /etc/apk/repositories \
    && echo "http://mirrors.aliyun.com/alpine/v3.9/community/" >> /etc/apk/repositories \
    && apk update && apk add --no-cache tzdata tini \
    && rm -f /etc/localtime \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && mkdir -p /opt/app
WORKDIR /opt/app
COPY . .

RUN yarn install --prod

EXPOSE 3000
ENTRYPOINT ["/sbin/tini","--", "yarn", "start"]
