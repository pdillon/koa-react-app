# koa-react-app

Starter project that leverages create-react-app with a Koa service. 10 easy (and tedious) steps!

## Setup

1. Install deps

        yarn add --dev react-scripts babel-preset-env babel-cli nodemon
        yarn add react react-dom
        yarn add koa koa-router@next koa-static koa-bodyparser
        
2. Create src paths

        mkdir ./src && mkdir ./src/service
        
3. Copy out react-scripts template folders

        cp -r ./node_modules/react-scripts/template/src ./src/client
        cp -r ./node_modules/react-scripts/template/public ./public
        
4. Add scripts section to package.json

        "scripts": {
          "eject": "react-scripts eject",
          "start": "yarn build:client && yarn build:service && yarn start:service",
          "start:dev": "(yarn build:service && yarn start:service:dev) & yarn watch:client & yarn watch:service",
          "build:client": "node ./scripts/build.js",
          "watch:client": "node ./scripts/start.js",
          "start:service": "node ./lib/service/index.js",
          "start:service:dev": "nodemon ./lib/service/index.js",
          "watch:service": "NODE_ENV=development babel --watch ./src/service -d ./lib/service",
          "build:service": "NODE_ENV=production babel ./src/service -d ./lib/service"
        }
        
5. Run "eject".

        yarn eject
        
6. Update ./config/paths.js to match new src/client folder

        // config after eject: we're in ./config/
        module.exports = {
          appBuild: resolveApp('build'),
          appPublic: resolveApp('public'),
          appHtml: resolveApp('public/index.html'),
          appIndexJs: resolveApp('src/client/index.js'),
          appPackageJson: resolveApp('package.json'),
          appSrc: resolveApp('src/client'),
          yarnLockFile: resolveApp('yarn.lock'),
          testsSetup: resolveApp('src/client/setupTests.js'),
          appNodeModules: resolveApp('node_modules'),
          nodePaths: nodePaths,
          publicUrl: getPublicUrl(resolveApp('package.json')),
          servedPath: getServedPath(resolveApp('package.json'))
        };

7. Add an index.js file to ./src/service with the following code

        import Koa from 'koa';
        import koaStatic from 'koa-static';
        import KoaRouter from 'koa-router';
        
        const app = new Koa();
        const router =  new KoaRouter();
        
        router.get('/api/test', async (ctx) => {
           ctx.body = {
             data: 'Api test successful'
           };
        });
        
        app.use(router.routes());
        app.use(koaStatic('./build'));
        
        const port = 4000;
        
        app.listen(port, () => {
          console.log(`Service started on port ${port}`);
        });
        
8. Add a .babelrc file to ./src/service

        {
          "presets": [
            ["env", {
              "targets": {
                "node": "current"
              }
            }]
          ]
        }

9. Add a "proxy" entry to package.json

        "proxy": "http://localhost:4000"
        
10. Run `yarn start:dev` or `yarn start`
