import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, ScrollView} from '@tarojs/components'
import { AtInput, AtForm, AtButton, AtDivider, AtIcon, AtTabBar  } from 'taro-ui'
import './study.scss'


export class StudyFinish extends Component {

  config = {
    navigationBarTitleText: '恭喜'
  }
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  handleChange (value) {
    this.setState({
      value
    })
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goHome(){
    Taro.navigateBack()
  }
  
  render () {
    return (
      <View>
        <View>
          恭喜你已经完成了当前牌组！
        </View>
        <AtButton type='primary' onClick={this.goHome}>返回首页</AtButton>
      </View>
      
    )
  }
}
