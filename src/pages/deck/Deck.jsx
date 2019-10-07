import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { 
  AtTextarea,
  AtInput,
  AtButton, 
  AtMessage,
  AtActivityIndicator,
} from 'taro-ui'
import {
  getDeckInfo, 
  regDeck,
  editDeck,
} from '../../api/deck'

import './deck.scss'


export class Deck extends Component {

  config = {
    navigationBarTitleText: '牌组'
  }

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      submiting: false,
      data: null,
    }
  }

  refresh(){
    let self = this
    let did = this.$router.params.did
    this.setState({did: did, loading: true})
    getDeckInfo(did, function(res){
      if(res.code === 200){
        console.log(res.data)
        self.setState({data: res.data, loading: false})
      }else{
        Taro.atMessage({
          type: 'error',
          message: res.msg
        })
        self.setState({loading: false})
      }
    }, function(e){
      Taro.atMessage({
        type: 'error',
        message: JSON.stringify(e)
      })
      self.setState({loading: false})
    })
  }

  componentDidShow () { 
    this.refresh()
  }

  reg = ()=> {
    console.log('reg')
    let self = this
    this.setState({submiting: true})
    regDeck(this.$router.params.did, function(res){
      console.log(res)
      if(res.code === 200){
        Taro.atMessage({
          type: 'success',
          message: "收藏成功"
        })
        self.refresh()
      }else{
        Taro.atMessage({
          type: 'error',
          message: res.msg
        })
      }
      self.setState({submiting: false})
    }, function(e){
      self.setState({submiting: false})
      Taro.atMessage({
        type: 'error',
        message: JSON.stringify(e)
      })
    })
  }
  
  saveDeck = ()=> {
    let param = {Title: this.state.data.deck.Title}
    let self = this
    self.setState({submiting: true})
    editDeck(this.$router.params.did, param, function(res){
      if(res.code == 200){
        Taro.atMessage({message: "保存成功", type:"success"})
      }else{
        Taro.atMessage({message: res.msg, type: "error"})
      }
      self.setState({submiting: false})
    }, function(e){
      Taro.atMessage({message: JSON.stringify(e), type: "error"})
      self.setState({submiting: false})
    })
  }

  goHome = ()=> {
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }

  startStudy = ()=> {
    Taro.navigateTo({
      url: "/pages/study/Study?did=" + this.$router.params.did
    })
  }
  handleChange(value){
    let data = { ...this.state.data }
    console.log(data)
    data.deck.Title = value
    this.setState({
      data
    })
  }

  render () {
    let {loading, data, submiting} = this.state
    return (
      <View>
        <AtMessage />
        { data === null ? <View></View> : data.auth ?
          <View>
            <AtInput
              name='value'
              title='牌组名称'
              type='text'
              placeholder='牌组名称'
              value={this.state.data.deck.Title}
              onChange={this.handleChange.bind(this)}
            />
            <AtButton 
              onClick={this.saveDeck}
              disabled={loading || submiting}
            >
              保存
            </AtButton>
            <AtButton openType='share'>分享</AtButton>
            <AtButton 
              type='primary'
              disabled={loading || submiting}
              onClick={this.startStudy}>开始复习</AtButton>
          </View> : 
          <View>
            <View>牌组: {this.state.data.deck.Title}</View>
            <AtButton 
              type='primary' 
              onClick={this.reg}
              disabled={loading || submiting}
            >
              收藏
            </AtButton>
            <AtButton disabled={loading || submiting} openType='share'>分享</AtButton>
          </View>
        }
        <AtButton onClick={this.goHome}>返回主页</AtButton>
        {loading || submiting ? <AtActivityIndicator></AtActivityIndicator> : null }
      </View>
      
    )
  }
}
