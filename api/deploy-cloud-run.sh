#!/usr/bin/env bash
set -euo pipefail

# ─── Configuration ────────────────────────────────────────────────────────────
# Change these to match your setup:
PROJECT_ID="sos-miau-app"          # your GCP project
SERVICE_NAME="my-api"              # your Cloud Run service name
REGION="us-central1"               # region where your service lives
IMAGE_TAG="latest"                 # Docker tag to use

# Derive the full image path:
IMAGE="gcr.io/${PROJECT_ID}/${SERVICE_NAME}:${IMAGE_TAG}"

# ─── Build & Submit ───────────────────────────────────────────────────────────
echo "🔨 Building & submitting image to Cloud Build..."
gcloud builds submit --project="$PROJECT_ID" \
  --tag "$IMAGE" \
  .

# ─── Deploy ────────────────────────────────────────────────────────────────────
echo "🚀 Deploying ${SERVICE_NAME} to Cloud Run (${REGION})..."
gcloud run deploy "$SERVICE_NAME" \
  --project="$PROJECT_ID" \
  --image "$IMAGE" \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated

# ─── Done ──────────────────────────────────────────────────────────────────────
URL=$(gcloud run services describe "$SERVICE_NAME" \
  --project="$PROJECT_ID" \
  --platform managed \
  --region "$REGION" \
  --format="value(status.url)")

echo
echo "✅ Deployment complete!"
echo "Service URL: $URL"
