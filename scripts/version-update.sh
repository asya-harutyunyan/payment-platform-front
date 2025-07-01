
FILE="info.json"

# Check if file exists
if [ -f "$FILE" ]; then
  # Read current version
  VERSION=$(jq '.version' "$FILE")
  if [ -z "$VERSION" ] || ! [[ "$VERSION" =~ ^[0-9]+$ ]]; then
    echo "Invalid version in file. Resetting to 0."
    VERSION=0
  fi
else
  echo "$FILE does not exist. Creating..."
  VERSION=0
fi

# Increment version
NEW_VERSION=$((VERSION + 1))

# Write updated version to file
echo "{\"version\": $NEW_VERSION}" > "$FILE"

# Confirm
echo "Updated version to $NEW_VERSION in $FILE"