import Taro from '@tarojs/taro'


export function httpGet(url, succ, fail){
  const option = {
    url: url,
    method: "get",
    header: {
      Cookie: Taro.getStorageSync('cookies')
    },
    success(res) {
      if (succ){
        succ(res.data)
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


export function httpPost(url, data, succ, fail){
  const option = {
    url: url,
    method: "post",
    data: data,
    header: {
      Cookie: Taro.getStorageSync('cookies')
    },
    success(res) {
      if (succ){
        succ(res.data)
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


export function httpPut(url, data, succ, fail){
  const option = {
    url: url,
    method: "put",
    data: data,
    header: {
      Cookie: Taro.getStorageSync('cookies')
    },
    success(res) {
      if (succ){
        succ(res.data)
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