import Router from 'koa-router'
import login from './controllers/login'

const router = new Router()

router
  .post('login', '/api/login', login)

export default router
