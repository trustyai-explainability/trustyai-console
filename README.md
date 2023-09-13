# trustyai-console
Web console for TrustyAI Explainability Service.

## Running the container
Set the address of the TrustyAI and Grafana services by setting the environment variables `TRUSTYAI_URL`  and `GRAFANA_URL` as below:

```shell
 docker run --rm -p 8081:8080 -e TRUSTYAI_URL=http://localhost:8080 -e GRAFANA_URL=http://grafana:3000 trustyai-console
```

The console will then be available at: http://localhost:8989

### Docker compose example
```shell
services:
  trustyai:
    image: quay.io/rgeada/trustyai-service:grafana-demo
    container_name: trustyai-service
    ports:
      - "8080:8080"
    environment:
      SERVICE_STORAGE_FORMAT: "MEMORY"
      SERVICE_DATA_FORMAT: "CSV"
      SERVICE_METRICS_SCHEDULE: "5s"
      SERVICE_BATCH_SIZE: 5000
      STORAGE_DATA_FILENAME: "data.csv"
      STORAGE_DATA_FOLDER: "/inputs"
      LOG_LEVEL: "DEBUG"
    volumes:
      - ~/volumes/pvc/inputs:/inputs
  trustyai-console:
    image: quay.io/acreasy/trustyai-console:grafana
    container_name: trustyai-console
    ports:
      - 8081:8080
    environment:
      TRUSTYAI_URL: http://trustyai:8080
      GRAFANA_URL: http://grafana:3000
  prometheus:
    image: prom/prometheus
    container_name: prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    ports:
      - 9090:9090
    restart: unless-stopped
    volumes:
      - ./prometheus:/etc/prometheus
      - prom_data:/prometheus
  grafana:
    image: grafana/grafana
    container_name: grafana
    ports:
      - 3000:3000
    restart: unless-stopped
    environment:
      GF_SECURITY_ADMIN_USER: admin
      GF_SECURITY_ADMIN_PASSWORD: admin
      GF_AUTH_ANONYMOUS_ENABLED: true
      GF_SECURITY_ALLOW_EMBEDDING: true
      GF_SERVER_ROOT_URL: http://trustyai-console:8080/grafana/
      GF_SERVER_SERVE_FROM_SUB_PATH: true
    volumes:
      - ./grafana/datasource.yml:/etc/grafana/provisioning/datasources/datasource.yml
      - ./grafana/dashboard.yaml:/etc/grafana/provisioning/dashboards/main.yaml
      - ./grafana/dashboards:/var/lib/grafana/dashboards
  generator-1:
    container_name: generator-1
    image: trustyai/trustyai-service-partial
    build:
      context: ./logger
      dockerfile: ./partial.Dockerfile
    environment:
      MODEL_NAME: "example-model-1"
      SERVICE_ENDPOINT: "http://trustyai:8080/consumer/kserve/v2"
      PYTHONUNBUFFERED: "1"
  generator-2:
    container_name: generator-2
    image: trustyai/trustyai-service-partial
    build:
      context: ./logger
      dockerfile: ./partial.Dockerfile
    environment:
      MODEL_NAME: "example-model-2"
      SERVICE_ENDPOINT: "http://trustyai:8080/consumer/kserve/v2"
      PYTHONUNBUFFERED: "1"

volumes:
  prom_data:
```

Run `docker compose up -d` and open the console at: http://localhost:8989

### Running the demo

From the demo directory run:

```shell
docker compose build
docker compose up -d
./add-requests.sh   
```

Open a browser and point it at `http://localhost:8081`
