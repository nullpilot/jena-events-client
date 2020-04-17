# jenavsvirus

> Boilerplate for #JenaVsVirus Hackathon

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explaination on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Deployment

The demo is deployed to heroku. To work with the deployment process an heroku account and contribution rights to the heroku app **jenavsvirus-dev** are necessary. The deployed app is available under https://jenavsvirus-dev.herokuapp.com/. Also the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#uninstalling-the-legacy-heroku-gem) is required.

### Set Environment Variables

Environment variables are known as *Config Vars* on Heroku. Those are written to the `process.env` in Node.js.

```bash
# list all variables
heroku config

# set variable
heroku config:set <KEY>=<VALUE>

# remove variable
heroku config:unset <KEY>
```

### Manual Deployment

```bash
# log into heroku
heroku login

# add heroku remote
heroku git:remote -a jenavsvirus-dev

# test changes locally
heroku local

# push branch 'dev' to heroku remote (it's also possible to use other branches than 'dev')
git push heroku dev:master
```
