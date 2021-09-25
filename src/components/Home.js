import React from "react";
import { connect } from "react-redux";
import QuestionList from "./QuestionList";
import NotFound from "./NotFound";

class Home extends React.Component {
  state = {
    activeTab: "Unanswered",
  };

  handleClickTab = (tab) => {
    this.setState(() => ({
      activeTab: tab,
    }));
  };

  render() {
    const labels = ["Unanswered", "Answered"];
    const { authedUser, questions } = this.props;
    const { activeTab } = this.state;
    if (authedUser === null) {
      return <NotFound />;
    }
    const { selectedOption } = authedUser;
    let answer = [];
    let unAnswered = [];
    Object.keys(questions).forEach((question) => {
      if (Object.keys(selectedOption.answers).includes(question)) {
        answer.push(questions[question]);
      } else {
        unAnswered.push(questions[question]);
      }
    });

    answer = answer.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });

    unAnswered = unAnswered.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });

    return (
      <div className="container">
        <ul className="sub-nav">
          {labels.map((label) => (
            <li
              key={label}
              onClick={() => this.handleClickTab(label)}
              id={activeTab === label && "active"}
            >
              {label}
            </li>
          ))}
        </ul>
        {activeTab === "Unanswered" && <QuestionList questions={unAnswered} />}
        {activeTab === "Answered" && <QuestionList questions={answer} />}
      </div>
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
