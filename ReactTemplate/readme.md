# AltaReturn Investor Portal App

### Local NPM feed set-up

As current project depends on components from private npm feed, it is necessary to add .npmrc file for user npm profile.
To do this:
1) navigate to: https://tfs.altareturn.com:8443/tfs/Vertice%20TFS/Investor%20Portal%203.0/_packaging
2) choose vertice feed and press Connect to feed
3) select npm feed and press Generate npm credentials
4) copy generated token to local .npmrc file, located at C:\Users\%username%
5) if .npmrc file is missing, use npmrc package or create this file manually.
For more info go to:
https://docs.microsoft.com/en-us/vsts/package/npm/npmrc
https://www.npmjs.com/package/vsts-npm-auth
https://www.npmjs.com/package/npmrc

## Getting Started

Install template:
1) create and navigate to folder for new component
2) run `npm init` or create package.json file manually
2a) don't forget to add `.npmrc` file to access Vertice npm feed
3) install latest or specific template package version:
```
npm install vertice-frontend-template@latest --no-save
```
4) install automatically added dependencies
```
npm install
```
5) enjoy

## Running development server

Run webpack dev server (for assets):

```
npm start
```

Visit [http://localhost:3000/](http://localhost:3000/).

## Building assets (index.html and bundle) for dev or prod

For development use

```
npm run devpack:server
npm run devpack:client
```

For develompent watch client build

```
npm run devpack:client:watch
```

For production use

```
npm run prodpack:server
npm run prodpack:client
```

### Profiling

For profile file creation use

```
npm run profile
```

Then use created file stats.json for bundle analysis with means of 
https://alexkuz.github.io/webpack-chart/

### Testing


--no-save