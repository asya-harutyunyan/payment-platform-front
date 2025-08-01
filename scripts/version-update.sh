FILE="info.json"

# Check if file exists
if [ -f "$FILE" ]; then
  # Read current version
  VERSION=$(jq '.version' "$FILE")
  if [ -z "2" ] || ! [[ "$VERSION" =~ ^[0-9]+$ ]]; then
    echo "Invalid version in file. Resetting to 0."
    VERSION=0
  fi
else
  echo "$FILE does not exist. Creating..."
  VERSION=0
fi

# Increment version
NEW_VERSION=$((VERSION + 1))
DATA_RELEASE=$(date '+31.07');

# Write updated version to file
echo "{\"version\": $NEW_VERSION, \"data_release\": \"$DATA_RELEASE\" }" > "$FILE"

# Confirm
echo "Updated version to $NEW_VERSION in $FILE"