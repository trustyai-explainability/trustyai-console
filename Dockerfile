FROM registry.access.redhat.com/ubi8/nodejs-18:latest as build-stage

WORKDIR /usr/src/app

COPY --chown=default:root . /usr/src/app

USER default

RUN npm ci --omit=optional
RUN npm run build

FROM registry.access.redhat.com/ubi8/nginx-120

COPY --from=build-stage /usr/src/app/dist/ /opt/app-root/src
COPY --from=build-stage /usr/src/app/nginx.conf "$NGINX_CONF_PATH"

CMD ["nginx", "-g", "daemon off;"]

LABEL io.k8s.display-name="trustyai-console" \
      name="alexcreasy/trustyai-console" \
      summary="trustyai-console" \
      description="TrustyAI web console"
