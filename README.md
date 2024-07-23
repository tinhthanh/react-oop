
## Run Local
Open project terminal:\
Step 1: `npm run app-init`\
Step 2: `npm install`\
Step 3: `npm start`\
Open http://localhost:1301 to view it in the browser


## Run Docker
### !!!! Remove 'framework' & 'common' folder before run docker
### !!!! env-value should be ['dev', 'prod']
Step 1: `docker build -t <name-image> --build-arg ENV=<env-value> .`  
Step 2: `docker run --name <name-container> -d -p <hostPort>:80 <name-image>`

## Required Nodejs