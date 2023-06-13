/** @description 一个有效的axios配置 */
import axios from 'axios'


const axios_config = axios.create({
  baseURL: 'http://localhost:3000',//baseurl 替换
  timeout: 5000,//timeout 替换
})

//请求拦截
axios_config.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => { }
)

//响应拦截
axios_config.interceptors.response.use(
  (suc_response) => {
    return suc_response
  },
  (err_response) => {
    return Promise.reject(err_response)
  }
)

export default axios_config