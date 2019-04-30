import React, { Component } from 'react'
import Qustion from './Qustion';

export default class Player extends Component {
  render() {
    return (
      <div className='player-screen'>
        <h3>Player</h3>
        <Qustion/>
      </div>
    )
  }
}
