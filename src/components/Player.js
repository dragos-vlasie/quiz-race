import React, { Component } from 'react'
import Question from './Question';

export default class Player extends Component {
  render() {
    return (
      <div className='player-screen'>
        <h3>Player</h3>
        <Question/>
      </div>
    )
  }
}
