FROM node:carbon-alpine

RUN apk update && apk add tzdata \
    && rm -f /etc/localtime \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install --only=production

EXPOSE 3000
CMD [ "npm", "start" ]