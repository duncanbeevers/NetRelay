const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const createRouter = require('koa-bestest-router');
const setup = require('./setup');

setup().
  then(
    ({ buses }) => {
      const port = 3000;

      const router = createRouter({
        GET: {
          '/': (context, next) => {
            context.body = 'Hello World!'
          },

          '/delay': async (context, next) => {
            await next();

            const start = Date.now();

            context.body = await new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve({
                  'message': 'Hello World!',
                  query: context.request.query,
                  duration: Date.now() - start
                });
              }, 500);
            });
          },

          '/ioline': async (context, next) => {
            await next();

            const id = parseInt(context.request.query.id, 10) - 1;
            const value = context.request.query.value.toString() === '1' ? true : false;

            const busID = Math.floor(id / 16) + 1;
            const pinID = (id % 16) + 1;

            context.body = await new Promise((resolve, reject) => {
              buses[busID - 1].writePin(pinID, value ? 0xFF : 0x00);
              resolve({
                success: true,
                value,
                busID,
                pinID
              });
            });
          }
        }
      });

      console.log(`Listening on port ${port}`)
      app.
        use(json()).
        use(router).
        listen(port);
    },
    (error) => {
      console.log('Terrible error!');
      console.log(error);
    });
