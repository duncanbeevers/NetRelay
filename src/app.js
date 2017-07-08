const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const createRouter = require('koa-bestest-router');

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
    }
  }
});

app.
  use(json()).
  use(router);

app.listen(3000);
