# Historic quotes application
React front and Node back application for historical quotes' profit for virtual currencies.

This is the github repository for the coding test part of the application process for the NAB Digital Forms job position. It contains two folders:
1. historic-api: this folder contains the NodeJS REST API backend with the Express routes for consulting a quote for a particular currency
   and date. It contains the test folder that was used during development for testing the routes with Jest.
2. historic-ui: this folder contains the React frontend with the graphical user components that communicate with the previous API for
   querying a quote's profit for a particular currency and date. It contains the test folder with tests for the date and money parser.
   It uses babel and webpack.
This application will query on the quotes collection on MongoDB, as indicated in the file "NAB Coding challenge - Digital Forms.pdf", sent to me by the recruitment agency.

**IMPORTANT**: for Windows machines, please execute FIRST the batch script **historic-quotes-api_winDev.bat** for starting the Node REST API, having git, mongoDB, node, npm and yarn installed. Then execute the second batch script **historic-quotes-ui_winDev.bat** to start the React app.

**IMPORTANT**: for Linux machines, please execute **historic-quotes-ui_linuxDev.sh** for starting the app and nagivate to localhost:8080, having mongoDB, node, npm and yarn installed.

**IMPORTANT**: AWS version
For running this app on an AWS EC2 instance, go to your console, and launch an EC2 instance adding the script **ubuntuEC2_historic-quotes-app_userData.sh** in the user data field, wait for it to launch, and go to your public DNS.
This script installs mongoDB, node, npm, yarn, nginx, configures nginx as reverse proxy for the React app, clones this repo and executes the app. Nevertheless, there is a caveat that I was not able to resolve during these 4 days that I dedicated to this project: there is a XHTML loop that tries to go to localhost:8080 from the UI and a CORS blocking from the Express server that I could not overcome, even though the right headers are set, as you can see on the quote router. Even so, this app would work perfectly on Heroku. I challenged myself to do this without much previous knowledge, and I think I did it quite nicely.

**REACT boo boo**: there is misalignment of the react date picker and the currency input that surpassed my CSS knowledge for now. As I said, I only dedicated from April 23 at 7pm, to April 27 at 8:30PM to do this commit, so I could resolve it before you guys review this repo. But I just want to stress I focused to do this on a particular timeframe, I believe dit it very well, çause I do want this job and I'm more than capable for it. I did not use Spring Cloud and Freemarker to speed up the process, even though I specialize in Spring for REST APIs, because I like to challenge myself and protype as fast and as good as I can. The code is clean, showing TDD and of course there is room for improvements.

Future improvements:
1. Document the API with Swagger so it can be put behind AWS Api Gateway
2. Adding AWS RDS instead of MongoDB
3. Adding a AWS ELB instead of Nginx

What is lacking:
1. Resolve the loopback of localhost:8080 with environment variables for hostname, on AWS
2. Resolver the CORS blocking from Express at port 3000, on AWS







*All civilizations become either spacefaring or extinct. - Carl Sagan, Pale Blue Dot*
