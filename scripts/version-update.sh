#!/bin/bash

FILE="info.json"

# Default version if file doesn't exist
DEFAULT_VERSION="0.0.0"

# Initialize frontend and backend versions
FRONTEND_VERSION=$DEFAULT_VERSION
BACKEND_VERSION=$DEFAULT_VERSION

# Check if file exists and extract versions
if [ -f "$FILE" ]; then
  FRONTEND_VERSION=$(jq -r '.frontend_version // empty' "$FILE")
  BACKEND_VERSION=$(jq -r '.backend_version // empty' "$FILE")

  # Validate frontend version
  if ! [[ "$FRONTEND_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Invalid frontend version in file. Resetting to $DEFAULT_VERSION."
    FRONTEND_VERSION=$DEFAULT_VERSION
  fi

  # Validate backend version
  if ! [[ "$BACKEND_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Invalid backend version in file. Resetting to $DEFAULT_VERSION."
    BACKEND_VERSION=$DEFAULT_VERSION
  fi
else
  echo "$FILE does not exist. Creating..."
fi

# Split versions into parts and increment PATCH
IFS='.' read -r F_MAJOR F_MINOR F_PATCH <<< "$FRONTEND_VERSION"
F_PATCH=$((F_PATCH + 1))
NEW_FRONTEND_VERSION="$F_MAJOR.$F_MINOR.$F_PATCH"

IFS='.' read -r B_MAJOR B_MINOR B_PATCH <<< "$BACKEND_VERSION"
B_PATCH=$((B_PATCH + 1))
NEW_BACKEND_VERSION="$B_MAJOR.$B_MINOR.$B_PATCH"

# Format date as DD.MM
DATA_RELEASE=$(date '+%d.%m')

# Write updated versions to file
echo "{
  \"frontend_version\": \"$NEW_FRONTEND_VERSION\",
  \"backend_version\": \"$NEW_BACKEND_VERSION\",
  \"data_release\": \"$DATA_RELEASE\"
}" > "$FILE"

# Confirm
echo "Updated frontend_version to $NEW_FRONTEND_VERSION"
echo "Updated backend_version to $NEW_BACKEND_VERSION"
echo "Saved to $FILE"
