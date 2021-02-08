import React, { Component } from "react";
import { View, Text, Canvas, Button } from "@tarojs/components";
import "./game.less";
import Board from "../board/board";
import { AtButton, AtIcon, AtGrid } from "taro-ui";
import "taro-ui/dist/style/components/icon.scss";

const direction = { up: 1, down: 2, left: 3, right: 4 };
var interval;
export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: Array(400).fill(0),
      length: 4,
      snake: [0, 0, 0, 0],
      food: -1,
      dir: direction.left,
      start: true,
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
      //    console.log("yes");
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
    this.gameover(sn, this.state.dir);
    if (this.state.pos[sn[0]] === "f") {
      //console.log(sn);
      sn.push(tail);
      this.changePos(sn, "s", () => {
        this.foodInit();
        this.setState({ snake: sn, length: this.state.length + 1 });
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
    //console.log("f", newFood);

    this.setState({ food: newFood }, () => {
      var newA = this.changePos([this.state.food], "f");
      // this.setState({ pos: newA });
    });
  }
  snakeInit() {
    var newHead = Math.floor(Math.random() * 400);

    if (newHead % 20 < this.state.length) newHead += this.state.length;
    else if (newHead % 20 > 20 - this.state.length)
      newHead -= this.state.length;
    //console.log("1", newHead);
    var sn = [];
    for (var i = 0; i < this.state.length; i++) {
      sn[i] = newHead + i;
    }
    //console.log(sn);
    this.setState({ snake: sn }, () => {
      //state是异步更新的，所以要用回调函数 https://www.jianshu.com/p/a883552c67de
      var newA = this.changePos(this.state.snake, "s");

      //console.log(1, this.state.pos);
      // this.setState({ pos: newA });
      this.foodInit();
    });
    // console.log("h", this.state.head, this.state.tail);
  }

  handle(e) {
    console.log(e);
    if (this.state.dir == 1) this.setState({ dir: direction.left });
    else this.setState({ dir: direction.up });
  }

  gameover(sn, dir) {
    //游戏结束的判定条件 1头碰到边界 2 头碰到身体

    //条件1
    if (dir == 1 && sn[0] < 0) clearInterval(this.interval);
    else if (dir == 2 && sn[0] >= 400) clearInterval(this.interval);
    else if (dir == 3 && sn[0] % 20 == 19) clearInterval(this.interval);
    else if (dir == 4 && sn[0] % 20 == 0) clearInterval(this.interval);

    //条件2 本质数组去重
    var uni = [...new Set(sn)];
    if (sn.length != uni.length) clearInterval(this.interval);
  }

  start() {
    if (this.state.start) {
      this.init();
      this.interval = setInterval(this.update.bind(this), 500);
      this.setState({ start: !this.state.start });
    } else {
      clearInterval(this.interval);
      this.setState({
        pos: Array(400).fill(0),
        length: 4,
        snake: [0, 0, 0, 0],
        food: -1,
        dir: direction.left,
        start: true,
      });
    }
  }

  changeDir(dir) {
    if (this.state.dir + dir != 7 && this.state.dir + dir != 3)
      this.setState({ dir: dir });
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View>
        <Board map={this.state.pos} touch={this.handle.bind(this)} />
        <Text>Score:{this.state.length - 4}</Text>

        <AtButton
          type="primary"
          size="small"
          circle
          onClick={this.start.bind(this)}
        >
          {this.state.start ? "开始" : "结束"}游戏
        </AtButton>
        <View className='at-row at-row__justify--center'>
          <AtIcon
            value="arrow-up"
            size="30"
            onClick={this.changeDir.bind(this, 1)}
          ></AtIcon>
        </View>
      
        <View className="at-row at-row__justify--center">
          <AtIcon
            value="arrow-left"
            size="30"
            onClick={this.changeDir.bind(this, 3)}
          ></AtIcon>
          <AtIcon
            value="arrow-right"
            size="30"
            onClick={this.changeDir.bind(this, 4)}
          ></AtIcon>
        </View>
        <View className="at-row at-row__justify--center">
          <AtIcon
            value="arrow-down"
            size="30"
            onClick={this.changeDir.bind(this, 2)}
          ></AtIcon>{" "}
        </View>
      </View>
    );
  }
}
