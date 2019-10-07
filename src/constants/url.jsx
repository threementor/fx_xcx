import Taro from '@tarojs/taro'

export const HOST_PROD = "https://www.memoryplusplus.com"
export const HOST_DEV = "http://192.168.1.100:8080"

export function getBaseUrl(){
  if(process.env.NODE_ENV=='development'){
    return Taro.getStorageSync("host") || HOST_DEV
  }else{
    return HOST_PROD
  }
}

export const DEBUG = process.env.NODE_ENV==='development'


