
## Run Local
Open project terminal:\
Step 1: `npm install`\
Step 2: `npm start`\
Open http://localhost:1301 to view it in the browser


## Run Docker
### !!!! env-value should be ['dev', 'prod']
Step 1: `docker build -t <name-image> --build-arg ENV=<env-value> .`  
Step 2: `docker run --name <name-container> -d -p <hostPort>:80 <name-image>`

## Required Nodejs
docker build -t browser-task-ui:1.0 --build-arg ENV=prod .
docker build -t browser-task-ui -d -p 81:80 browser-task-ui:1.0