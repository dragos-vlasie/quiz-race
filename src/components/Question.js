import axios from 'axios';
import React, { Component } from 'react'
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      events : [],
      isHidden: false
    };
  }

  componentDidMount() {
    axios.get('https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple')
    .then((response) => {
      console.log(response);
      this.setState({events: response.data.results})
    })
   .catch((error)=>{
      console.log(error);
   });
  }

  encoding(unsafe) {
    return unsafe
         .replace(/&amp;/g, "&")
         .replace(/&lt;/g, "<")
         .replace(/&gt;/g, ">")
         .replace(/&quot;/g, "\"")
         .replace(/&#039;/g, "'")
         .replace(/&amp;#039;/g, "'")
         .replace(/&ldquo;/g, "“")
         .replace(/&rdquo;/g, "”");
  }
  
  showQuestion = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  renderFirstQuestion(i) {
    const questions  = this.state.events;
    console.log('questions:', questions)

    if(questions.length){
      var allAnswers = questions[0].incorrect_answers
      allAnswers.push(questions[0].correct_answer)
      allAnswers.sort();
    }

    const questionList = questions.length ? (
      <div>
        <h3>{this.encoding(questions[0].question)}</h3>

        <div className="question-wrapper">{allAnswers.map(answers => <button>{this.encoding(answers)}</button>)}</div>
        
      </div>
    
) : (
  <div>no questions</div>
) 
return questionList
  }

  render() {
    const questions  = this.state.events;
    console.log('questions:', questions)

    return (
      <div className='question'>
        { !this.state.isHidden ? <button onClick={this.showQuestion}>Start</button> : null }
        { this.state.isHidden ? this.renderFirstQuestion() : null }
      </div>
    )
  }
}

export default Question;




