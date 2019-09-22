import Taro from '@tarojs/taro'
const base = 'http://127.0.0.1:8080'


export function regOrLogin(code, succ, fail){
  let url = '/v1/user/wechat_login'
  let param = {
    Code: code
  }
  const option = {
      url: base + url,
      data: param,
      method: "post",
      success(res) {
        if (succ){
          succ(res)
        }
      },
      error(e) {
        if(fail){
          fail(e)
        }
      }
    }
  Taro.request(option).catch((e) => {
    if(fail){
      fail(e)
    }
  })
}