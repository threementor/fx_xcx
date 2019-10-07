import Taro from '@tarojs/taro'

export function setQueryConfig(url, param){ 
  console.log(url)
  console.log(param)
  var x = url + '?'; 
  for(var o in param){ 
    if(param[o] != -1){ 
      x += o + "=" + param[o] + "&"; 
    } 
  }
 var x = x.substring(0, x.length-1); 
 return x; 
}

export function httpAction(url, data, succ, fail, method){
  const option = {
    url: url,
    method: method,
    data: data,
    header: {
      Cookie: Taro.getStorageSync('cookies')
    },
    success(res) {
      console.log(res)
      if(res.cookies && res.cookies.length > 0){
        Taro.setStorageSync("cookies", res.cookies[0])
      }else{
        // Set-Cookie: "beegosessionID=92d513684a7d189d724d84cf2fda769b; Path=/; HttpOnly"
        if('Set-Cookie' in res.header){
          let sps = res.header['Set-Cookie'].split(';')
          console.log(sps)
          if(sps.length>0){
          f
            Taro.setStorageSync("cookies", sps[0])
          }
        } 
      }
      if(res.statusCode == 401){
        if(Taro.getCurrentPages().length > 0){
          let pages = Taro.getCurrentPages()
          console.log(pages)
          let url = "/pages/login/Login?next="
          if(pages.length > 0){
            let nextPage = pages[pages.length-1]
            console.log(nextPage)
            let nextUrl = '/' + setQueryConfig(nextPage.route, nextPage.options)
            nextUrl = escape(nextUrl)
            url = url + nextUrl
          }
          console.log(url)
          Taro.redirectTo({ "url": url})
        }else{
          Taro.redirectTo({ "url": "/pages/login/Login" })
        }
        
      }else if (succ){
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


export function httpGet(url, succ, fail){
  httpAction(url, null, succ, fail, 'get')
}


export function httpPost(url, data, succ, fail){
  httpAction(url, data, succ, fail, 'post')
}


export function httpPut(url, data, succ, fail){
  httpAction(url, data, succ, fail, 'put')
}
