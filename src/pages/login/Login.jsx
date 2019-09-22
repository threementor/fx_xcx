import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import {regOrLogin} from '../../api/user'
import { AtToast, AtMessage } from "taro-ui"
import './Login.scss'


export default class Login extends Component{

  state = {
      username: "",
      passwd: "",
      errorText: "",
      isAuthed: false,
  }

  componentWillMount(){
    this.wxLogin()
  }

  wxLogin(){
    if (!this.state.isAuthed){
      Taro.showLoading({
        title: '登录中...'
      })
      Taro.login({
        success: res => {
          if (res.code){
            regOrLogin(res.code, function(res){
                console.log(res)
                if(res.code == 200){
                  
                  Taro.redirectTo({
                    url: '/pages/index/index'
                  })
                }else{
                  Taro.atMessage({
                    'message': '登录失败: ' + res.msg,
                    'type': 'fail',
                  })
                  Taro.hideLoading()
                }
                

              }, function(res){
                Taro.hideLoading()
                Taro.atMessage({
                  'message': '登录失败: ' + JSON.stringify(res),
                  'type': 'fail',
                })
              }
            )
          }else{
            Taro.hideLoading()
            Taro.atMessage({
              'message': '获取code失败',
              'type': 'fail',
            })
          }
          
        },
        fail: e => {
          Taro.hideLoading()
        }
      })
    }
  }
  render(){
    return (
      <View>
        <AtMessage />
        <Button
          type="primary"
          onClick={this.wxLogin}
        >微信登录</Button>
      </View>
    )
  }
}

