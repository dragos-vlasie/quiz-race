import axios from "axios";
import React, { Component } from "react";
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isHidden: false,
      questionNumber: 0,
      playerScore: 0
    }
  }

  componentDidMount() {
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple"
      )
      .then(response => {
        console.log(response);
        this.setState({ events: response.data.results });
      })
      .catch(error => {
        console.log(error);
      });
  }

  encoding(unsafe) {
    return unsafe
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;#039;/g, "'")
      .replace(/&ldquo;/g, "“")
      .replace(/&rdquo;/g, "”")
      .replace(/&aacute;/g, "á")
      .replace(/&Eacute;/g, "É");
  }

  showQuestion = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  chosenAnswer = event => {
    const questions = this.state.events;
    var questionCurrentNumber = this.state.questionNumber;
    let chosenAnswer = event.target.innerText;
    let correctAnswer = questions[questionCurrentNumber].correct_answer;

    if (this.encoding(correctAnswer) === chosenAnswer) {
      console.log("SUCCESS:", "add to the score");

      this.setState({
        playerScore: this.incrementNumber(this.state.playerScore)
      });
    } else {
      console.log("de cact:", "subtract");

      this.setState({
        playerScore: this.decrementNumber(this.state.playerScore)
      });
    }

    if (questionCurrentNumber === 9) {
      // prepare for the api call
    }
    this.setState({
      questionNumber: this.incrementNumber(questionCurrentNumber)
    });
  };

  incrementNumber = increment => {
    increment++;
    // this.progress();
    return increment;
  };

  decrementNumber = decrement => {
    decrement--;
    return decrement;
  };

  renderQuestion(number) {
    const questions = this.state.events;
    let allAnswers;
    if (questions.length) {
      allAnswers = questions[number].incorrect_answers;
      allAnswers.push(questions[number].correct_answer);
      allAnswers.sort();
    }

    const questionList = questions.length ? (
      <div>
        
      <h3>{this.encoding(questions[number].question)}</h3>
      <div id="answers" class="grid">

          {allAnswers.map(answers => (
            <button  class="answer" onClick={event => this.chosenAnswer(event)}>
              {this.encoding(answers)}
            </button>
          ))}
      </div>
          </div>
    ) : (
      <div>no questions</div>
    );

    return questionList;
  }

  render() {
    if (this.state.questionNumber !== 9) {
      return (
        <div class="container">
          <div class="feedback">
            <h4 class="left">
              Time Left: <span id="time">60</span>
            </h4>
            <h4 class="right">
              Score: <span id="score">{this.state.playerScore}</span>
            </h4>
          </div>
            {!this.state.isHidden ? (
              <button class="answer" onClick={this.showQuestion}>
                Start
              </button>
            ) : null}
            {this.state.isHidden
              ? this.renderQuestion(this.state.questionNumber)
              : null}
        </div>
      );
    } else {
      return (
        <div>
          <div class="feedback">
            <h4 class="left">
              Time Left: <span id="time">0</span>
            </h4>
            <h4 class="right">
              Score: <span id="score">{this.state.playerScore}</span>
            </h4>
          </div>
          <h3 class="answer">Choose the next category</h3>
          <div class="grid">
            <button class="answer">Options1</button>
            <button class="answer">Options1</button>
            <button class="answer">Options3</button>
          </div>
        </div>
      );
    }
  }
}

export default Question;
