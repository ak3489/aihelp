/**
 * @Description: 
 * @Author: gcz
 * @Date: 2022-11-17 15:48:03
 * @LastEditors: gcz
 * @LastEditTime: 2023-03-17 17:43:47
 * @FilePath: \aihelp\src\service\index.js
 * @Copyright: Copyright (c) 2016~2022 by gcz, All Rights Reserved. 
 */

 import axios from '../utils/axios'

 export function turboChat(params) {
  return axios.post(`api/openai/turboChat`, params);
}

export function getBalance(params) {
  return axios.post(`api/openai/getBalance`, params);
}

export function getImage(params) {
  return axios.post(`api/openai/generateImage`, params);
}

//  export function getUserInfo() {
//    return axios.get('/user/info');
//  }

// export function getFolders(userId) {
//   return axios.get(`/code/getFolders?userId=${userId}`);
// }
// export function getCodeList(folderId,pageNo,pageSize) {
//   return axios.get(`/code/getCodeList?folderId=${folderId}&pageNo=${pageNo}&pageSize=${pageSize}`);
// }

// export function setSharePass(params) {
//   return axios.post(`/code/setSharePass`, params);
// }

// export function delCodeApi(id) {
//   return axios.post(`/code/delCode`,{id:id});
// }
