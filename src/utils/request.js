import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 处理超粗安全范围的数据
request.defaults.transformResponse = [function (data) {
  try {
    return JSONbig.parse(data)
  } catch (err) {
    return data
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  let user = store.state.user
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default request
