REM This file must be executed BEFORE the ui batch script so the folders and repository are already in place.
mkdir C:\tmp & cd C:\tmp
git clone https://github.com/hernihub/historic-quotes-app.git
cd historic-quotes-app\historic-api
yarn install & yarn run start