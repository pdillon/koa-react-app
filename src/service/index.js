import Koa from 'koa';
import koaStatic from 'koa-static';
import KoaRouter from 'koa-router';

const app = new Koa();
const router =  new KoaRouter();

router.get('/api/test', async (ctx) => {
  ctx.body = {
    message: 'Api test works!'
  };
});

app.use(router.routes());
app.use(koaStatic('./build'));

const port = 4000;

app.listen(port, () => {
  console.log(`Service started on port ${port}`);
});