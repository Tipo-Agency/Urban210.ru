#!/usr/bin/env bash
# Превью концепций на tipa-prod: https://urban210.uchetgram.ru (не прод, live urban210.ru не трогает).
#   bash scripts/deploy-preview.sh
set -euo pipefail
cd "$(dirname "$0")/.."

HOST=tipa-prod
DIR=/var/www/urban210-preview
SITE=urban210.uchetgram.ru

npm run build
test -f dist/client/concepts/index.html

ssh "$HOST" "mkdir -p ${DIR}.next"
rsync -az --delete dist/client/ "$HOST:${DIR}.next/"
ssh "$HOST" "rm -rf ${DIR}.prev; if [ -d ${DIR} ]; then mv ${DIR} ${DIR}.prev; fi; mv ${DIR}.next ${DIR}; chown -R www-data:www-data ${DIR}"

# nginx уже настроен (копия с сертификатом в deploy/preview-nginx.conf). Конфиг не перезаписываем, чтобы не потерять строки certbot.
# Первая установка: scp deploy/preview-nginx.conf "$HOST:/etc/nginx/sites-available/${SITE}", затем certbot --nginx -d ${SITE}
echo "Выложено: https://${SITE}/ (концепции: /concepts/)"
