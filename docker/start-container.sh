#!/bin/sh
set -eu

if [ ! -f .env ]; then
  cp .env.example .env
fi

php artisan config:clear >/dev/null 2>&1 || true

attempt=0
until php artisan migrate --force; do
  attempt=$((attempt + 1))

  if [ "$attempt" -ge 20 ]; then
    echo "Database is still unavailable after 20 attempts."
    exit 1
  fi

  echo "Waiting for database... attempt $attempt/20"
  sleep 3
done

php artisan serve --host=0.0.0.0 --port=8000

