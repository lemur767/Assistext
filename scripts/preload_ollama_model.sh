#!/bin/bash

# Script to preload the Ollama model
# This ensures the model is loaded into memory on boot

# Load environment variables if needed
# source /path/to/Assistext/backend/.env

MODEL_NAME="huihui_ai/mistral-small-abliberated"
OLLAMA_HOST="http://localhost:11434"

echo "Waiting for Ollama API to be available..."

# Loop until Ollama is ready
until curl -s -f "$OLLAMA_HOST/api/tags" > /dev/null; do
    sleep 2
    echo "Retrying..."
done

echo "Ollama is up. Preloading model: $MODEL_NAME"

# Run a dummy prompt to load the model into memory
# We use 'generate' with an empty prompt or a simple "hi" to trigger the load
curl -X POST "$OLLAMA_HOST/api/generate" -d '{
  "model": "'"$MODEL_NAME"'",
  "prompt": "hi",
  "stream": false
}'

echo "Model preload request sent."
