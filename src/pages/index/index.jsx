import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { 
  AtList, 
  AtListItem, 
  AtActivityIndicator,
  AtTabBar, 
  AtMessage,
  AtFab,
  AtButton,
  AtFloatLayout,
} from "taro-ui"
import {getDeckList} from '../../api/deck'

import {
  DEBUG,
  HOST_PROD, 
  HOST_DEV
} from '../../constants/url'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  state = {
    loading: false,
    openDebugDialog: false,
  }
  constructor(props){
    super(props)
    this.state = {
      decks: [],
    }
  }

  componentWillMount () {

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    let self = this
    this.setState({loading: true})
    getDeckList(function(res){
      console.log(res)
      self.setState({
        decks: res.data || [],
        loading: false
      })
    }, function(e){
      Taro.atMessage({
        'message': '获取deck失败',
        'type': 'error',
      })
      self.setState({loading: false})

    })
  }

  componentDidHide () { }

  addDeck(value) {
    Taro.navigateTo({
      url: '/pages/addDeck/AddDeck'
    })
  }
  
  go2study = (did) => {
    console.log('go2study ' + did)
    Taro.navigateTo({
      url: '/pages/deck/Deck?did=' + did,
    })
  }

  openDebug = ()=> {
    this.setState({openDebugDialog: true})
  }
  
  closeDebug = ()=> {
    this.setState({openDebugDialog: false})
  }

  cleanStorage = () => {
    Taro.clearStorage()
  }
  
  change2Prop = () => {
    Taro.setStorageSync("host", HOST_PROD)
  }

  change2dev = ()=> {
    Taro.setStorageSync("host", HOST_DEV)
  }


  render () {
    let decks = this.state.decks
    console.log(decks)
    return (
      <View className='index'>
        <AtMessage />
        {
          DEBUG ? <AtFab onClick={this.openDebug}>
          <Text className='at-fab__icon at-icon at-icon-menu'></Text>
        </AtFab> : null
        }
        <AtFloatLayout 
          isOpened={this.state.openDebugDialog} 
          title="DEBUG"
          onClose={this.closeDebug}
        >
          <AtButton onClick={this.cleanStorage}>cleanStorage</AtButton>
          <AtButton onClick={this.change2Prop}>切换到线上</AtButton>
          <AtButton onClick={this.change2dev}>切换到线下</AtButton>
        </AtFloatLayout>
        <AtList>
          {
            decks.map((row, i) => (
              <AtListItem 
                title={row.Title}
                onClick={this.go2study.bind(this, row.Id)} 
                arrow='right'
                key={row.Id}
              />
            ))
          }
        </AtList>
        <View class="botton_block"/>

        {this.state.loading ? <AtActivityIndicator></AtActivityIndicator> : <View />}
        <AtTabBar
          fixed
          tabList={[
            { title: '添加牌组', iconType: 'add-circle'},
          ]}
          onClick={this.addDeck.bind(this)}
          current={this.state.current}
        />
      </View>
    )
  }
}
