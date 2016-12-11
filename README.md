# Fika

This is a service created keep track of who's got fredagsfika. It runs on AWS
Lambda and is meant to be used with Slack slash command.

### Installation
```
npm install
npm install -g claudia
```

## How to deploy
This project uses a helper library, Claudia, for deploying NodeJS functions to
AWS Lambda.

### Setup Claudia with AWS
Make sure you have an AWS account and then follow the official instructions  [here](https://claudiajs.com/tutorials/installing.html) to set it up.

The steps are basically;

1. Create a ```.aws/credentials``` file in your home folder, containing;
```
[claudia]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_ACCESS_SECRET
```
2. Set the environment variable ```AWS_PROFILE``` to ```claudia```.

### Build the code
This project uses Babel for all its code, except the function entry point app.js.
```
npm run build
```

### Deploy function
Figure out which AWS region you want to deploy to, ```eu-central-1``` is a good
choice if you live in EU.

Then run the Claudia command which creates the function.
```
claudia create --region AWS_REGION --api-module app
```
