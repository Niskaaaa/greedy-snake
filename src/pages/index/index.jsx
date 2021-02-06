import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'
import Game from '../game/game'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Game></Game>
      </View>
    )
  }
}
