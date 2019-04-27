#!/bin/bash
sudo su
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
apt-get update
apt-get install -y mongodb-org
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections

apt install nodejs -y
apt install npm -y
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
apt update
apt install yarn
cd /home/ubuntu
git clone https://github.com/hernihub/historic-quotes-app.git
cd historic-quotes-app
cd historic-api
yarn install
export PORT=3000
export MONGODB_URL=mongodb://127.0.0.1:27017/quotesdb
export DATABASE_NAME=quotesdb
yarn run start &
cd ..
cd historic-ui
yarn install
yarn run dev-server &
apt-get install nginx -y
rm /etc/nginx/sites-available/default
cat > /etc/nginx/sites-available/default << EOF
server {
    listen 80;
    server_name your_domain.com amazonPublicDNS;
    location / {
        proxy_pass localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
     }
}
EOF
systemctl reload nginx
# go to public DNS port 8080