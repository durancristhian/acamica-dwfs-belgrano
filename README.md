# acamica-dwfs-belgrano

[![Build Status](https://travis-ci.org/durancristhian/acamica-dwfs-belgrano.svg?branch=master)](https://travis-ci.org/durancristhian/acamica-dwfs-belgrano) [![Greenkeeper badge](https://badges.greenkeeper.io/durancristhian/acamica-dwfs-belgrano.svg)](https://greenkeeper.io/)

Acamica - Desarrollo Web Full Stack - Sede Belgrano 2018/2019

## Setting up the environment

- Create a Google Spreadsheet based on `/resources/database.xlsx`.
- [Check out these easy-to-follow steps](https://support.google.com/docs/answer/37579) in order to be able to publish it and fetch its data.
- Create an `.env` file from `.env.template`

  ```bash
  cp .env.template .env
  ```

- And complete it with the needed information

  ```bash
  code .env
  ```

> HINT: The `SPREADSHEET_ID` is part of the Google Spreadsheet's URL.

## Development

```bash
# install dependencies
npm i

# fetch the spreadsheet's data
npm run fetch-dataset

# start server
npm start
```
