#!/bin/bash

FILE="info.json"

# Default version if file doesn't exist
DEFAULT_VERSION="0.0.0"

# Check if file exists and extract version
if [ -f "$FILE" ]; then
  VERSION=$(jq -r '.version' "$FILE")
  
  # Validate version format
  if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Invalid version in file. Resetting to $DEFAULT_VERSION."
    VERSION=$DEFAULT_VERSION
  fi
else
  echo "$FILE does not exist. Creating..."
  VERSION=$DEFAULT_VERSION
fi

# Split version into parts
IFS='.' read -r MAJOR MINOR PATCH <<< "$VERSION"

# Increment patch
PATCH=$((PATCH + 1))

# Compose new version
NEW_VERSION="$MAJOR.$MINOR.$PATCH"

# Format date as DD.MM
DATA_RELEASE=$(date '+%d.%m')

# Write updated version to file
echo "{\"version\": \"$NEW_VERSION\", \"data_release\": \"$DATA_RELEASE\"}" > "$FILE"

# Confirm
echo "Updated version to $NEW_VERSION in $FILE"
