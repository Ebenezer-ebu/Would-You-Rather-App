import React from "react";
import { connect } from "react-redux";
import NotFound from "./NotFound";

class Board extends React.Component {
  render() {
    const { authedUser, users } = this.props;
    if (authedUser === null) {
      return <NotFound page={this.props.history.location.pathname} />;
    }
    let arrUsers = Object.keys(users);
    let sortedUsers = arrUsers.sort((a, b) => {
      let next =
        users[b].questions.length + Object.keys(users[b].answers).length;
      let ist =
        users[a].questions.length + Object.keys(users[a].answers).length;
      return next - ist;
    });

    return (
      <div className="container">
        <ul className="card-list">
          {sortedUsers.map((user) => {
            return (
              <li key={users[user].id}>
                <div className="content">
                  <img
                    src={users[user].avatarURL}
                    className="list-image"
                    alt=""
                  />
                  <div className="mid-sec">
                    <h2>{users[user].name}</h2>
                    <p className="span-text">
                      <span>Answered Questions</span>
                      <span>{Object.keys(users[user].answers).length}</span>
                    </p>
                    <hr />
                    <p className="span-text">
                      <span>Created Questions</span>

                      <span>{users[user].questions.length}</span>
                    </p>
                  </div>
                  <div className="scorecard">
                    <h4>Score</h4>
                    <hr />
                    <p>
                      {Object.keys(users[user].answers).length +
                        users[user].questions.length}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  return {
    authedUser,
    users,
    questions,
  };
}

export default connect(mapStateToProps)(Board);
