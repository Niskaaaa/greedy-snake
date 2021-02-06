import "./square.less"
import React, { Component } from "react";
import { View, Text, Canvas, Button } from "@tarojs/components";
export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square">
      </button>
    );
  }
}
