import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { 
  AtList, 
  AtListItem, 
  AtActivityIndicator,
  AtTabBar, 
  AtMessage
} from "taro-ui"
import {getDeckList} from '../../api/deck'


export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  state = {
    loading: false
  }
  constructor(props){
    super(props)
    this.state = {
      decks: [],
    }
  }

  componentWillMount () { }

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
      url: '/pages/study/Study?did=' + did,
    })
  }

  render () {
    let decks = this.state.decks
    console.log(decks)
      
    return (
      <View className='index'>
        <AtMessage />
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
