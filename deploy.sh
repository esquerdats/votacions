#!/bin/sh
npm run build
scp package.tar.gz root@votacions-ago.esquerdats.cat:
ssh root@votacions-ago.esquerdats.cat << EOF
  mkdir /var/www/meteor/tmp
  cd /var/www/meteor/tmp
  tar xzf ~/package.tar.gz
  cd ./bundle/programs/server
  npm install --production
  npm prune --production
  cd /var/www/meteor
  mv ./bundle bundle.old
  mv ./tmp/bundle ./
  passenger-config restart-app /var/www/meteor/bundle
  rm -rf /var/www/meteor/tmp
  rm -rf /var/www/meteor/bundle.old
EOF