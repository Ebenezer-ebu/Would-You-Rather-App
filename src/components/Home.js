import React from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import QuestionList from "./QuestionList";
import NotFound from "./NotFound";

class Home extends React.Component {
  state = {
    answered: false,
    activeAnswer: '',
    unanswered: true,
    activeUnanswered: 'active',
  };

  handleUnanswered = () => {
    this.setState(() => ({
      unanswered: true,
      activeUnanswered: "active",
      answered: false,
      activeAnswer: "",
    }));
  };
  handleAnswered = () => {
     this.setState(() => ({
       answered: true,
       activeAnswer: "active",
       unanswered: false,
       activeUnanswered: "",
     }));
  };
  render() {
    const { authedUser, questions } = this.props;
    const { answered, unanswered, activeAnswer, activeUnanswered } = this.state;
    if (authedUser === null) {
      return <NotFound />
    }
    const { selectedOption } = authedUser;
    let answer = [];
    let unAnswered = [];
    Object.keys(questions).forEach((question) => {
      if (Object.keys(selectedOption.answers).includes(question)) {
        answer.push(questions[question]);
      }
    });
    Object.keys(questions).forEach((question) => {
      if (!Object.keys(selectedOption.answers).includes(question)) {
        unAnswered.push(questions[question]);
      }
    });

    answer = answer.sort((a, b) => {
      return b.timestamp - a.timestamp
    });

    unAnswered = unAnswered.sort((a, b) => {
      return b.timestamp - a.timestamp
    });

    return (
      <>
        <Nav />
        <div className="container">
          <ul className='sub-nav'>
            <li onClick={this.handleUnanswered} id={activeUnanswered}>Unanswered</li>
            <li onClick={this.handleAnswered} id={activeAnswer}>Answered</li>
          </ul>
          {unanswered && <QuestionList questions={unAnswered} />}
          {answered && <QuestionList questions={answer} />}
        </div>
      </>
    );
  }
}

function mapStateToProps({ questions, authedUser, users }) {
  return {
    questions,
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Home);
