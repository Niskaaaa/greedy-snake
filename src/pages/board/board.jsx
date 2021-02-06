import React, { Component } from "react";
import { View, Text, Canvas, Button } from "@tarojs/components";
import Square from "../square/square"
import "./board.less"
export default class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  renderBoard(str) {


    for (var i = 1; i < 11; i++) {
      
      for (var j = 1; j < 11; j++) {
         // var temp=this.renderSquare(i * j)
         // console.log(temp)
          str.push(<Button className="square">11</Button>)
        
      }

      str.push(<br></br>)

   
      
    }
    return str
  }

  render() {
    var str = []
    this.renderBoard(str)

    return <View style="width:350px;height:350px;margin:0 auto">{str}</View>;
  }
}
