#!/bin/bash

gcloud run deploy my-api \
  --image gcr.io/sos-miau-app/my-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
