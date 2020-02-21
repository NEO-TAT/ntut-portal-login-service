import axios from 'axios'
import axiosCookieJarSupport from 'axios-cookiejar-support'
import tough from 'tough-cookie'
import qs from 'qs'
import { Context } from 'koa'

const PORTAL_INDEX_URL = 'https://nportal.ntut.edu.tw/index.do'
const PORTAL_LOGIN_URL = 'https://nportal.ntut.edu.tw/login.do'

interface LoginRequestBody {
  studentId: string;
  password: string;
}

axiosCookieJarSupport(axios)

async function loginPortal (studentId: string, password: string, cookieJar: tough.CookieJar) {
  const httpClient = axios.create()
  const postData = qs.stringify({
    muid: studentId,
    mpassword: password,
    forceMobile: 'mobile'
  })
  const { data } = await httpClient.post(PORTAL_LOGIN_URL, postData,
    {
      jar: cookieJar,
      headers: {
        Referer: PORTAL_INDEX_URL
      },
      withCredentials: true
    })
  // if login successfully, the responsed body would only contain a <script>
  const isLoginFailed = (data as string).trim().startsWith('<!DOCTYPE')
  if (isLoginFailed) {
    throw new Error('LOGIN_FAILED')
  }
}

async function getFirstCookieFromCookieJar (cookieJar: tough.CookieJar) {
  return new Promise((resolve: (cookie: tough.Cookie) => void, reject) => {
    cookieJar.getCookies(PORTAL_LOGIN_URL, (error, cookies) => {
      if (error) {
        reject(error)
      } else {
        resolve(cookies[0])
      }
    })
  })
}

export default async (ctx: Context) => {
  const loginRequestBody: LoginRequestBody = ctx.request.body
  const { studentId, password } = loginRequestBody
  const cookieJar = new tough.CookieJar()
  await loginPortal(studentId, password, cookieJar)
    .catch((error) => ctx.throw(400, error))

  const cookie: tough.Cookie = await getFirstCookieFromCookieJar(cookieJar)

  ctx.status = 201
  ctx.body = {
    cookie: cookie.toJSON()
  }
}
