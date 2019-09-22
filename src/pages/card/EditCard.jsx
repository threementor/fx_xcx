import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTextarea, AtButton, AtMessage } from 'taro-ui'
import './card.scss'
import {getCard, editCard} from '../../api/card'


export class EditCard extends Component {

  config = {
    navigationBarTitleText: '编辑卡片'
  }
  constructor (props) {
    super(props)
    this.state = {
      cid: '',
      front: '',
      back: '',
      loading: false,
      submiting: false,
    }
  }
  handleChange (value) {
    this.setState({
      value
    })
  }
  componentWillMount () {
    let cid = this.$router.params.cid
    let self = this
    this.setState({loading: true, cid: cid})
    getCard(cid, function(res){
      self.setState({loading: false})
      if(res.code == 200){
        self.setState({front: res.data.Note.Title, back: res.data.Note.Content})
      }else{
        Taro.atMessage({
          type: 'error',
          message: res.msg
        })
      }
    }, function(e){
      self.setState({loading: false})
      Taro.atMessage({
        type: 'error',
        message: JSON.stringify(e)
      })
    })
  }

  saveCard = ()=> {
    let self = this
    let note = {Title: this.state.front, Content: this.state.back}
    this.setState({submiting: true})
    editCard(this.state.cid, note, function(res){
      if(res.code === 200){
        Taro.atMessage({
          message: "保存成功"
        })
        self.setState({submiting: false})
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
    let {loading, submiting} = this.state
    return (
      <View>
        <AtMessage />
        <View className='panel__title'>正面</View>
        <View className='panel__content'>
          <AtTextarea
            count={false}
            value={this.state.front}
            disabled={loading || submiting}
            onChange={this.handleChange.bind(this, 'front')}
            placeholder='卡片正面内容'
            height='300'
          />
        </View>
        <View className='panel__title'>反面</View>
        <View className='panel__content'>
          <View>
            <AtTextarea
              disabled={loading || submiting}
              count={false}
              height='400'
              value={this.state.back}
              onChange={this.handleChange.bind(this, 'back')}
              placeholder='卡片反面内容'
            />
          </View>
        </View>
        <AtButton 
          disabled={loading || submiting}
          type="primary" onClick={this.saveCard}>保存</AtButton>
      </View>
      
    )
  }
}
