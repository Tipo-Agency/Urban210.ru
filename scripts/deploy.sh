#!/usr/bin/env bash
# Выкладка на сервер: собирает standalone-релиз локально, копирует в /opt/urban210/releases/<время>,
# переключает симлинк current и перезапускает сервис. Старые релизы: оставляем 3 последних.
# Запуск: SERVER=tipa-prod ./scripts/deploy.sh   (нужен .env.production с NEXT_PUBLIC_* переменными)
set -euo pipefail
SERVER="${SERVER:?укажите SERVER=host}"
ROOT=/opt/urban210
REL="$(date +%Y%m%d%H%M%S)"

[ -f .env.production ] || { echo "Нет .env.production (NEXT_PUBLIC_* вшиваются при сборке)"; exit 1; }
npm ci
npm run build
cp -r public .next/standalone/
mkdir -p .next/standalone/.next && cp -r .next/static .next/standalone/.next/

ssh "$SERVER" "mkdir -p $ROOT/releases/$REL"
rsync -az --delete .next/standalone/ "$SERVER:$ROOT/releases/$REL/"
ssh "$SERVER" "set -e
  ln -sfn $ROOT/releases/$REL $ROOT/current
  systemctl restart urban210
  sleep 2
  curl -fsS -o /dev/null http://127.0.0.1:3210/ && echo 'релиз $REL работает'
  ls -1dt $ROOT/releases/* | tail -n +4 | xargs -r rm -rf"
