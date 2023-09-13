#!/usr/bin/env bash

curl -X POST --location "http://localhost:8080/metrics/spd/request" \
    -H "Content-Type: application/json" \
    -d "{
            \"modelId\": \"example-model-1\",
            \"requestName\": \"SPD Input-2 Low\",
            \"protectedAttribute\": \"input-2\",
            \"favorableOutcome\":  0.0,
            \"outcomeName\": \"input-0\",
            \"privilegedAttribute\": 1.0,
            \"unprivilegedAttribute\": 0.0
        }"

curl -X POST --location "http://localhost:8080/metrics/spd/request" \
    -H "Content-Type: application/json" \
    -d "{
            \"modelId\": \"example-model-1\",
            \"requestName\": \"SPD Input-1 Low\",
            \"protectedAttribute\": \"input-1\",
            \"favorableOutcome\":  0.0,
            \"outcomeName\": \"input-0\",
            \"privilegedAttribute\": 1.0,
            \"unprivilegedAttribute\": 0.0
        }"

curl -X POST --location "http://localhost:8080/metrics/dir/request" \
    -H "Content-Type: application/json" \
    -d "{
            \"modelId\": \"example-model-1\",
            \"requestName\": \"DIR Input-1 Low\",
            \"protectedAttribute\": \"input-1\",
            \"favorableOutcome\":  0.0,
            \"outcomeName\": \"input-0\",
            \"privilegedAttribute\": 1.0,
            \"unprivilegedAttribute\": 0.0
        }"


curl -X POST --location "http://localhost:8080/metrics/spd/request" \
    -H "Content-Type: application/json" \
    -d "{
            \"modelId\": \"example-model-2\",
            \"requestName\": \"M2 SPD Input-2 High\",
            \"protectedAttribute\": \"input-2\",
            \"favorableOutcome\":  1.0,
            \"outcomeName\": \"input-0\",
            \"privilegedAttribute\": 1.0,
            \"unprivilegedAttribute\": 0.0
        }"

curl -X POST --location "http://localhost:8080/metrics/dir/request" \
    -H "Content-Type: application/json" \
    -d "{
            \"modelId\": \"example-model-2\",
            \"requestName\": \"M2 DIR Input-1 High\",
            \"protectedAttribute\": \"input-1\",
            \"favorableOutcome\":  1.0,
            \"outcomeName\": \"input-0\",
            \"privilegedAttribute\": 1.0,
            \"unprivilegedAttribute\": 0.0
        }"
