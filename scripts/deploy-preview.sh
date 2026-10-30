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

# nginx: только новый сайт, чужие конфиги не трогаем
scp deploy/preview-nginx.conf "$HOST:/etc/nginx/sites-available/${SITE}"
ssh "$HOST" "ln -sf /etc/nginx/sites-available/${SITE} /etc/nginx/sites-enabled/${SITE} && nginx -t && systemctl reload nginx"
# HTTPS (один раз): ssh tipa-prod "certbot --nginx -d ${SITE} --non-interactive --agree-tos --redirect"
echo "Выложено: https://${SITE}/concepts/"
