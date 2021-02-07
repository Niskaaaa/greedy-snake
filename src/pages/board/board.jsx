import React, { Component } from "react";
import { View, Text, Canvas, Button } from "@tarojs/components";
import Square from "../square/square";
import "./board.less";
export default class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  renderBoard(map) {
    var str = []
    
  //  console.log('map',map)
    for (var i = 0; i < 400; i++) {
    
        // var temp=this.renderSquare(i * j)
        
        if (map[i] == "s") {
          console.log('s')
          str.push(<View className="square"><View className="snake"></View></View>);
        }
        else if (map[i] == "f")
          str.push(<View className="square"><View className="food"></View></View>);
        else str.push(<View className="square"></View>);
      

   
    }
    return str;
  }

  render() {
    console.log(this.props.map)
    var str = this.renderBoard(this.props.map);

    return <View style="width:350px;height:350px;margin:0 auto">{str}</View>;
  }
}
