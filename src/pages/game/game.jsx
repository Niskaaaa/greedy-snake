import React, { Component } from "react";
import { View, Text, Canvas, Button } from "@tarojs/components";
import "./game.less";
import Board from "../board/board";

const direction = { up: 1, down: 2, left: 3, right: 4 };
export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: Array(400).fill(0),
      length: 4,
      snake: [0, 0, 0, 0],
      food: -1,
      dir: direction.left,
    };
  }

  changePos(
    arr,
    value,
    func = () => {
      return;
    }
  ) {
    var newArr = this.state.pos;
    for (var i = 0; i < arr.length; i++) {
      newArr[arr[i]] = value;
    }

    this.setState({ pos: newArr }, () => {
      console.log("yes");
      func();
    });
  }

  init() {
    this.snakeInit();
    //  this.foodInit();
  }

  update() {
    var sn = this.state.snake;
    var tail = sn[sn.length - 1];
    var temp;
    if (this.state.dir === 1) temp = sn[0] - 20;
    else if (this.state.dir === 2) temp = sn[0] + 20;
    else if (this.state.dir === 3) temp = sn[0] - 1;
    else temp = sn[0] + 1;
    for (var i = this.state.length - 1; i > 0; i--) {
      sn[i] = sn[i - 1];
    }
    sn[0] = temp;

    if (this.state.pos[sn[0]] === "f") {
      console.log(sn)
      sn.push(tail);
      this.changePos(sn, "s", () => {
        this.foodInit();
        this.setState({ snake: sn,length:this.state.length+1 });
       
      });
    } else
      this.changePos([tail], 0, () => {
        this.changePos(sn, "s", () => {
          this.setState({ snake: sn });
        });
      });

    // this.setState({ pos: newA });
  }

  foodInit() {
    var newFood = Math.floor(Math.random() * 400);
    while (this.state.pos[newFood] != 0) {
      newFood = Math.floor(Math.random() * 400);
    }
    console.log("f", newFood);

    this.setState({ food: newFood }, () => {
      var newA = this.changePos([this.state.food], "f");
      // this.setState({ pos: newA });
    });
  }
  snakeInit() {
    var newHead = Math.floor(Math.random() * 400);

    if (newHead % 20 < this.state.length) newHead += this.state.length;
    console.log("1", newHead);
    var sn = [];
    for (var i = 0; i < this.state.length; i++) {
      sn[i] = newHead + i;
    }
    console.log(sn);
    this.setState({ snake: sn }, () => {
      //state是异步更新的，所以要用回调函数 https://www.jianshu.com/p/a883552c67de
      var newA = this.changePos(this.state.snake, "s");

      console.log(1, this.state.pos);
      // this.setState({ pos: newA });
      this.foodInit();
    });
    // console.log("h", this.state.head, this.state.tail);
  }

  handle(){

  }
  componentWillMount() {
    this.init();
    setInterval(
      this.update.bind(this),

      500
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View>
        <Text>贪吃蛇游戏</Text>
        <Button>开始游戏</Button>
        <Board map={this.state.pos} onTouch={this.handle}/>
      </View>
    );
  }
}
