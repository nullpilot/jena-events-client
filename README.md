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

## Manual Deployment

For manual deployment the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#uninstalling-the-legacy-heroku-gem) is required. You will also need an heroku account and contribution rights to the heroku app **jenavsvirus-dev**.

```bash
# log into heroku
heroku login

# add heroku remote
heroku git:remote -a jenavsvirus-dev

# push branch 'dev' to heroku remote
git push heroku dev:master
```

The deployed app is available under https://jenavsvirus-dev.herokuapp.com/.
