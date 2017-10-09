FROM node:latest
RUN mkdir -p /usr/src/personal-proxy
WORKDIR /usr/src/personal-proxy
COPY . /usr/src/personal-proxy
RUN cd /usr/src/personal-proxy;npm install
EXPOSE 8080
EXPOSE 8081
RUN /usr/src/personal-proxy/start.sh 2