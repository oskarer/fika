# Fika

This is a service created keep track of who's got fredagsfika. It runs on AWS
Lambda and is meant to be used with Slack slash command.

## Installation
```
$ npm install
$ npm install -g claudia
```

### Setup Google Spreadsheet
The Lambda function fetches its data from a Google Spreadsheet, create one with
the following format.

Year-week | Fika | Dependencies
--------- | ---- | ------------
2016-51|John|Mary
2017-01|James|Charlotte

Get the *name* of the sheet (*Sheet1* as default) and the *spreadsheet ID* from
the URL; https://docs.google.com/spreadsheets/d/SPREADSHEETID/edit#gid=0

### Generate an API key
Generate an API key in [Google API Manager](https://console.developers.google.com/apis/credentials).

## Build and test

### Build
Transpiles code in src into lib. It uses Babel for all its code, except the function entry point app.js.
```
$ npm run build
```

### Test
The script expects that the spreadsheet ID, sheet name and API key to be defined
as environment variables.

Omit the *set* if you're on a Unix like system.
```
$ set SPREADSHEET_ID=spreadsheetid
$ set SHEET_NAME=sheetname
$ set GOOGLE_API_KEY=apikey

$ npm run test
```

## How to deploy
This project uses a helper library, Claudia, for deploying NodeJS functions to
AWS Lambda.

### Setup Claudia with AWS
Make sure you have an AWS account and then follow the official instructions  [here](https://claudiajs.com/tutorials/installing.html) to set it up.

The steps are;

1. Create a ```.aws/credentials``` file in your home folder, containing;
```
[claudia]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_ACCESS_SECRET
```
2. Set the environment variable ```AWS_PROFILE``` to ```claudia```.

### Deploy function
Figure out which AWS region you want to deploy to, ```eu-central-1``` is a good
choice if you live in EU.

Then run the Claudia command which creates the function.
```
$ claudia create --region AWS_REGION --api-module app --set-env SPREADSHEET_ID=...,SHEET_NAME=...,GOOGLE_API_KEY=...
```

### Update function
Whenever you want to push local changes to AWS.
```
$ claudia update
```
