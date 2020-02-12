import Koa from 'koa'
import bodyparser from 'koa-bodyparser'

import router from './router'
import config from './config.json'

const app = new Koa()

app
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.port, () => {
  console.log('Service online')
})
