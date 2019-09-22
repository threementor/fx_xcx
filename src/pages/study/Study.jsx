import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, ScrollView} from '@tarojs/components'
import {
  AtInput, 
  AtForm, 
  AtMessage,
  AtButton, 
  AtTextarea,
  AtActivityIndicator,
  AtDivider, AtIcon, AtTabBar  } from 'taro-ui'
import './study.scss'
import {StudyFinish} from './StudyFinish'
import {getReadyCards} from '../../api/deck'
import {onCardHard, onCardNormal, onCardEasy} from '../../api/card'

export default class Study extends Component {

  config = {
    navigationBarTitleText: '复习'
  }
  onLoad(props){
    console.log(props)
  }
  constructor (props) {
    super(props)
    this.state = {
      did: null,
      loading: false,
      cards: [],
      showAnswer: false,
      submiting: false,
    }
  }
  handleChange (value) {
    this.setState({
      value
    })
  }

  refresh(){
    let self = this
    let did = this.$router.params.did
    this.setState({did: did, loading: true})
    getReadyCards(did, function(res){
      if(res.code === 200){
        console.log(res.data)
        self.setState({cards: res.data, loading: false})
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
    })
  }

  componentWillMount () { 
    
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { 
    this.refresh()
  }

  componentDidHide () { }

  goBack(){
    Taro.navigateBack()
  }

  onAdd = ()=> {
    Taro.navigateTo({
      url: '/pages/card/AddCard?did=' + this.state.did
    })
  }

  onEdit = () => {
    let c = this.curCard()
    if(c){
      Taro.navigateTo({
        url: '/pages/card/EditCard?cid=' + c.Id
      })
    }else{
      Taro.atMessage({
        message: "当前无卡片",
        type: 'error'
      })
    }
    
  }

  curCard(){
    return this.state.cards[0]
  }

  onHard = () => {
    let c = this.curCard()
    let self = this
    self.setState({submiting: true})
    onCardHard(c.Id, function(res){
      if(res.code == 200){
        self.nextCard()
      }else{
        Taro.atMessage({
          message: res.msg,
          type: 'error'
        })
      }
      self.setState({submiting: false})
    }, function(e){
      Taro.atMessage({
        message: JSON.stringify(e)
      })
      self.setState({submiting: false})
    })
  }
  onNormal= () => {
    let c = this.curCard()
    let self = this
    self.setState({submiting: true})
    onCardNormal(c.Id, function(res){
      if(res.code == 200){
        self.nextCard()
      }else{
        Taro.atMessage({
          message: res.msg,
          type: 'error'
        })
      }
      self.setState({submiting: false})
    }, function(e){
      Taro.atMessage({
        message: JSON.stringify(e)
      })
      self.setState({submiting: false})
    })

  }

  nextCard(){
    this.setState({cards: this.state.cards.slice(1), showAnswer: false})
  }

  onEasy = () => {
    let c = this.curCard()
    let self = this
    self.setState({submiting: true})
    onCardEasy(c.Id, function(res){
      if(res.code == 200){
        self.nextCard()
      }else{
        Taro.atMessage({
          message: res.msg,
          type: 'error'
        })
      }
      self.setState({submiting: false})
    }, function(e){
      Taro.atMessage({
        message: JSON.stringify(e)
      })
      self.setState({submiting: false})
    })

  }
  onShowAnswer = ()=> {
    this.setState({showAnswer: true})
  }
  render () {
    let c = this.curCard()
    let {loading, showAnswer, submiting} = this.state
    let finish = !loading & !c
    
    return (
      <View class="main">
        <AtMessage />

        <View className='at-row head'>
          <View className='at-col'><AtButton size="small" onClick={this.goBack}>主页</AtButton></View>
          <View className='at-col'><AtButton size="small" onClick={this.onAdd}>添加</AtButton></View>
          <View className='at-col'><AtButton size="small" onClick={this.onEdit}>编辑</AtButton></View>
          <View className='at-col'><AtButton size="small">搜索</AtButton></View>
        </View>
        {
          finish ? <View className='at-article__p'> 恭喜您当前已经完成了此牌组！ </View> : loading ? <View><AtActivityIndicator mode='center' content='加载中...'></AtActivityIndicator></View> : <View>
            <View class='card'>
              <View className='at-article__p'> {c.Note.Title} </View>
              <AtDivider>
                <AtIcon value='check-circle'></AtIcon>
              </AtDivider>
              {showAnswer ? <View className='at-article__p'>{ c.Note.Content }</View> : null}
            </View>
          }
            
          </View> 
        }
        <View className='bottom'>
          {
            finish ? <View/> : showAnswer ? <View className='at-row'>
            <View className='at-col'><AtButton size="small" disabled={submiting} onClick={this.onHard}>困难</AtButton></View>
            <View className='at-col'><AtButton size="small" disabled={submiting} onClick={this.onNormal}>一般</AtButton></View>
            <View className='at-col'><AtButton size="small" disabled={submiting} onClick={this.onEasy}>简单</AtButton></View>
            </View> : <View className='at-row'>
            <View className='at-col'><AtButton size="small" onClick={this.onShowAnswer}>{this.state.cards.length}</AtButton></View>
            </View>
          }
        </View>
      </View>
    )
  }
}
