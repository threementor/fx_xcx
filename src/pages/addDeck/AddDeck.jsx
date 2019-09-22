import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import { AtInput, AtForm, AtButton, AtMessage } from 'taro-ui'
import {addDeck} from '../../api/deck'

export default class AddDeck extends Component {

  config = {
    navigationBarTitleText: '添加牌组'
  }
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      loading: false,
    }
  }
  handleChange (value) {
    this.setState({
      value
    })
  }
  goBack = () => {
    this.setState({loading: true})
    addDeck({title: this.state.value}, function(res){
      if(res.code === 200){
        Taro.navigateBack()
      }else{
        Taro.atMessage({
          "message": "失败。" + JSON.stringify(res),
          "type": "error"
        })
      }
      
    }, function(e){
      this.setState({loading: false})
      Taro.atMessage({
        "message": "失败。" + JSON.stringify(e),
        "type": "error"
      })
    })
    
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  
  render () {
    return (
      <View>
        <AtMessage />
        <AtInput
          name='value'
          title='牌组名称'
          type='text'
          placeholder='牌组名称'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <AtButton 
          loading={this.state.loading}
          type='primary' 
          onClick={this.goBack}
          disabled={this.state.loading}
        >
          保存
        </AtButton>

      </View>
    )
  }
}
