import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import { answeredQues } from "../actions/questions";
import NotFound from "./NotFound";

class QuestionPage extends Component {
  state = { seleted: "optionOne" };
  handleOptionChange = (e) => {
    console.log(e.target.value);
    this.setState({
      seleted: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      authedUser: this.props.authedUser.selectedOption.value,
      qid: this.props.match.params.id,
      answer: this.state.seleted
    };
    this.props.dispatch(
      answeredQues(info)
    );
  }

  render() {
    const { questions, users, authedUser } = this.props;
    if (authedUser === null) {
      return <NotFound />;
    }
    const { id } = this.props.match.params;
    let oneVotes = questions[id].optionOne.votes.length;
    let twoVotes = questions[id].optionTwo.votes.length;
    let total = oneVotes + twoVotes;
    const oneVotesPer = (oneVotes / total) * 100;
    const twoVotesPer = 100 - oneVotesPer;
    const { selectedOption } = authedUser;
    let answers = Object.keys(selectedOption.answers);
    return (
      <>
        <Nav />
        <div className="container">
          {!answers.includes(id) ? (
            <>
              <h3>{users[questions[id].author].name} asks</h3>
              <hr className="rule" />
              <form className="content">
                <img
                  src={users[questions[id].author].avatarURL}
                  className="list-image"
                  alt=""
                />
                <div>
                  <h2>Would You Rather...</h2>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="optionOne"
                        checked={this.state.seleted === "optionOne"}
                        onChange={this.handleOptionChange}
                      />
                      {questions[id].optionOne.text}?
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="optionTwo"
                        checked={this.state.seleted === "optionTwo"}
                        onChange={this.handleOptionChange}
                      />
                      {questions[id].optionTwo.text}?
                    </label>
                  </div>
                  <button className="btn" onClick={this.handleSubmit}>
                    Submit
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h3>asked by {users[questions[id].author].name}</h3>
              <hr className="rule" />
              <div className="divide">
                <div>
                  <img
                    src={users[questions[id].author].avatarURL}
                    className="list-image"
                    alt=""
                  />
                </div>
                <div className="votes">
                  <h4>Results:</h4>
                  <div className="votes-card">
                    {questions[id].optionOne.text}?<br />
                    <progress
                      max="100"
                      value={oneVotesPer}
                      data-label={oneVotesPer + "%"}
                    ></progress>
                    <p>
                      {oneVotes} out of {total}
                    </p>
                  </div>
                  <div className="votes-card">
                    {questions[id].optionTwo.text}?<br />
                    <progress
                      max="100"
                      value={twoVotesPer}
                      data-label={twoVotesPer + "%"}
                    ></progress>
                    <p>
                      {twoVotes} out of {total}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(QuestionPage);
