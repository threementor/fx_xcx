import Taro from '@tarojs/taro'
import {BASE_URL} from '../constants/url'
import {httpGet, httpPost, httpPut} from './base.jsx'


export function regOrLogin(code, succ, fail){
  let url = BASE_URL + '/v1/user/wechat_login'
  let param = {
    Code: code
  }
  httpPost(url, param, succ, fail)  
}