import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTextarea, AtButton, AtMessage } from 'taro-ui'
import './card.scss'
import {addCard} from '../../api/deck'


export class AddCard extends Component {

  config = {
    navigationBarTitleText: '添加卡片'
  }
  constructor (props) {
    super(props)
    this.state = {
      front: '',
      back: '',
      did: null,
      submiting: false,
    }
  }
  handleChange (value) {
    this.setState({
      value
    })
  }
  
  saveCard = ()=> {
    let self = this
    let card = {Title: this.state.front, Content: this.state.back}
    this.setState({submiting: true})
    addCard(this.state.did, card, function(res){
      if(res.code === 200){
        Taro.atMessage({
          message: "保存成功"
        })
        self.setState({front: '', back: '', submiting: false})
      }else{
        Taro.atMessage({
          message: res.msg,
          type: 'error'
        })
      }
    },function(e){
      Taro.atMessage({
        message: JSON.stringify(e),
        type: 'error'
      })
    })
  }

  componentWillMount () {
    this.setState({did: this.$router.params.did})
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goHome(){
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }
  handleChange (stateName, e) {
    this.setState({
      [stateName]: e.target.value
    })
  }
  render () {
    let {submiting} = this.state
    return (
      <View>
        <AtMessage />
        <View className='panel__title'>正面</View>
        <View className='panel__content'>
          <AtTextarea
            count={false}
            value={this.state.front}
            onChange={this.handleChange.bind(this, 'front')}
            placeholder='卡片正面内容'
            height='300'
          />
        </View>
        <View className='panel__title'>反面</View>
        <View className='panel__content'>
          <View>
            <AtTextarea
              count={false}
              height='400'
              value={this.state.back}
              onChange={this.handleChange.bind(this, 'back')}
              placeholder='卡片反面内容'
            />
          </View>
        </View>
        <AtButton type="primary" 
          disabled={submiting}
          onClick={this.saveCard}>保存
        </AtButton>
      </View>
      
    )
  }
}
