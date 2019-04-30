import React, { Component } from 'react'
import Player from './Player';

export default class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Player/>
        <Player/>
      </div>
    )
  }
}
