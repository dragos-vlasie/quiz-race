import React, { Component } from 'react'
import axios from 'axios';

export default class Qustion extends Component {
  render() {
    axios.get('https://opentdb.com/api.php?amount=10')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    return (
      <div className='question'>
        <p>This will be a question</p>
      </div>
    )
  }
}
