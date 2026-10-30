#!/usr/bin/env bash
# Прод: https://urban210.ru на tipa-prod. Статика отдаёт nginx, node слушает только /api/lead (порт 3210).
# Запуск только по слову владельца или кнопке «Выкатить» в панели «Прод».
#   bash scripts/deploy-prod.sh
set -euo pipefail
cd "$(dirname "$0")/.."

HOST=tipa-prod
DIR=/var/www/urban210
REL="$DIR/releases/$(date +%Y%m%d-%H%M%S)"

PUBLIC_SITE_URL=https://urban210.ru PUBLIC_YM_ID=103720803 PUBLIC_VK_PIXEL_ID=3810570 PUBLIC_CALLTOUCH_ID=aauqct0x PUBLIC_CALLTOUCH_SITE_ID=52901 npm run build
test -f dist/client/index.html && test -f dist/server/entry.mjs

ssh "$HOST" "mkdir -p $REL"
rsync -az dist/ "$HOST:$REL/"
rsync -az package.json package-lock.json "$HOST:$REL/"
ssh "$HOST" "cd $REL && npm ci --omit=dev --ignore-scripts --no-audit --no-fund >/dev/null && chown -R www-data:www-data $REL && ln -sfn $REL $DIR/current && systemctl restart urban210 && ls -1dt $DIR/releases/* | tail -n +4 | xargs -r rm -rf"
sleep 2
ssh "$HOST" "curl -s -o /dev/null -w 'api %{http_code}\n' -X POST -H 'content-type: application/json' -d '{}' http://127.0.0.1:3210/api/lead/"
echo "Выложено: https://urban210.ru/"
