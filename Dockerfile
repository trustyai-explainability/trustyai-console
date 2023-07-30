FROM registry.access.redhat.com/ubi8/nodejs-18:latest as build-stage

WORKDIR /usr/src/app

COPY --chown=default:root . /usr/src/app

USER default

RUN npm ci --omit=optional
RUN npm run build

FROM registry.access.redhat.com/ubi8/nginx-120

COPY --from=build-stage /usr/src/app/dist/ /opt/app-root/src
COPY --from=build-stage /usr/src/app/nginx.conf "$NGINX_CONF_PATH"

ENV TRUSTYAI_URL="http://trustyai-service:8080"

CMD ["nginx", "-g", "daemon off;"]

LABEL io.k8s.display-name="trustyai-console" \
      name="alexcreasy/trustyai-console" \
      summary="trustyai-console" \
      version="0.2.0-latest" \
      description="TrustyAI web console"
