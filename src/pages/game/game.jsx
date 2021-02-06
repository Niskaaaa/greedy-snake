import React, { Component } from "react";
import { View, Text, Canvas, Button } from "@tarojs/components";
import "./game.less";
import Board from "../board/board"

const direction = { up: 1, down: 2, left: 3, right: 4 };
export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { pos: Array(64).fill(null) };
  }



  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View>
        <Text>贪吃蛇游戏</Text>
        <Button>开始游戏</Button>
        <Board
        />
      </View>
    );
  }
}
