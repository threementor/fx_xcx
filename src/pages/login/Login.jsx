import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import {regOrLogin} from '../../api/user'
import { AtToast, AtMessage } from "taro-ui"
import './Login.scss'


export default class Login extends Component{

  state = {
    loading: false
  }
  config = {
    navigationBarTitleText: '登录'
  }
  componentWillMount(){
    this.wxLogin()
  }

  wxLogin(){
    let self = this
    this.setState({loading: true})
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
                self.setState({loading: false})

              }
              

            }, function(res){
              Taro.hideLoading()
              self.setState({loading: false})
              Taro.atMessage({
                'message': '登录失败: ' + JSON.stringify(res),
                'type': 'fail',
              })
            }
          )
        }else{
          Taro.hideLoading()
          self.setState({loading: false})
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
  render(){
    return (
      <View>
        <AtMessage />
        <View className='at-article'>
          <View className='at-article__h1'>
            欢迎使用《温故复习》！
          </View>
        </View>
        <Button
          type="primary"
          onClick={this.wxLogin}
          loading={this.state.loading}
        >微信登录</Button>
      </View>
    )
  }
}

