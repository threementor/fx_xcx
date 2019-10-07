import Taro from '@tarojs/taro'
import {getBaseUrl} from '../constants/url'
import {httpGet, httpPost, httpPut} from './base.jsx'


export function regOrLogin(code, succ, fail){
  let url = getBaseUrl() + '/v1/user/wechat_login'
  let param = {
    Code: code
  }
  httpPost(url, param, succ, fail)  
}