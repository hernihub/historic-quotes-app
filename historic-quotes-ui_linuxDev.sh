cd ~
git clone https://github.com/hernihub/historic-quotes-app.git
cd historic-quotes-app/historic-api
yarn install
export PORT=3000
export MONGODB_URL=mongodb://127.0.0.1:27017/quotesdb
export DATABASE_NAME=quotesdb
yarn run start &
cd ..
cd historic-ui
yarn install
yarn run dev-server &