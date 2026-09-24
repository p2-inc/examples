#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

entity_id="http://localhost:8081/saml2/metadata"
key_file="credentials/private.key"
cert_file="credentials/cert.crt"

if [[ -f "$key_file" && -f "$cert_file" ]]; then
  echo "$key_file and $cert_file already exist. Delete them to generate a new pair."
  exit 0
fi

mkdir -p credentials
MSYS_NO_PATHCONV=1 openssl req -x509 -newkey rsa:2048 -nodes -sha256 -days 3650 \
  -subj "/CN=${entity_id//\//\\/}" \
  -keyout "$key_file" \
  -out "$cert_file"
chmod 600 "$key_file"

echo "Created $key_file and $cert_file for $entity_id"
