import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, ScrollView} from '@tarojs/components'
import './study.scss'


export default class Card extends Component {

  state = {
    content: ''
  }

  componentWillMount () {
    const content = this.props.content
    console.log(content)
    this.setState({
      content
    })
  }

  render(){
    let lines = this.state.content.split('\n')
    return (
      <View className='at-article'>
        { 
          lines.map((row, i)=>(
            <View key={`k${i}`} className='at-article__p'>{row}</View>
          ))
        }
      </View>
    )
  }
}