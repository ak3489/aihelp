/**
 * @Description: 
 * @Author: gcz
 * @Date: 2022-11-17 15:44:06
 * @LastEditors: gcz
 * @LastEditTime: 2023-03-21 14:19:53
 * @FilePath: \aihelp\src\utils\axios.js
 * @Copyright: Copyright (c) 2016~2022 by gcz, All Rights Reserved. 
 */
 import axios from 'axios'
//  import { Toast } from 'vant'
 import router from '../router'

 let accessToken = `Bearer ${JSON.parse(localStorage.getItem('authing-spa:1:6376fb5d2d8111d6673ed0fc:login-state'))?.accessToken}`

 axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://139.180.152.194:5000' : 'http://139.180.152.194:5000'
//  axios.defaults.withCredentials = true
 axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
 axios.defaults.headers['Authorization'] = accessToken || ''
 axios.defaults.headers.post['Content-Type'] = 'application/json'
 
 axios.interceptors.response.use(res => {
  console.log('resresres===========',res);
  console.log('res.code============',res.code);
  console.log('res.data?.code=======',res.data?.code);
   if (typeof res !== 'object') {
    //  Toast.fail('服务端异常！')
    alert('服务端异常！')
     return Promise.reject(res)
   }
   if (res.data?.code != 200&&res.code != 200) {
    //  if (res.data.message) Toast.fail(res.data.message)
     if (res.data.msg) alert(res.data.msg)
     if (res.data.code == 416) {
       router.push({ path: '/login' })
     }
     if (res.data.data && window.location.hash == '#/login') {
        localStorage.setItem('Authorization', res.data.data)
       axios.defaults.headers['Authorization'] = res.data.data
     }
     return Promise.reject(res.data)
   }
 
   return res.data
 })
 
 export default axios