import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class QuestionList extends Component {
  render() {
    const { users, values } = this.props;
    const { questions } = values;
    return (
      <ul className="card-list">
        {questions.map((ques) => {
          return (
            <li key={ques.id}>
              <h3>{users[ques.author].name} asks</h3>
              <hr />
              <div className="content">
                <img
                  src={users[ques.author].avatarURL}
                  alt={ques.author}
                  className="list-image"
                />
                <div className="right">
                  <h4>Would you Rather</h4>
                  <p>{ques.optionOne.text}</p>
                  <button
                    className="btn-poll"
                    onClick={() => {
                        this.props.history.push(`/question/${ques.id}`);
                    }}
                  >
                    View Poll...
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

function mapStateToProps({ users }, values) {
  return {
    users,
    values,
  };
}

export default withRouter(connect(mapStateToProps)(QuestionList));
