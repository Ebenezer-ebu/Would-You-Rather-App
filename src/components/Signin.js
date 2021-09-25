import React from "react";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../images/react-redux.svg";
import { setAuthedUser } from "../actions/authedUser";

class Signin extends React.Component {
  state = { selectedOption: null, toHome: false };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedOption } = this.state;
    if (selectedOption !== null) {
      this.setState(() => ({
        toHome: true,
      }));
      this.props.dispatch(setAuthedUser({ selectedOption }));
    }
  };
  render() {
    const { persons } = this.props;
    const { selectedOption, toHome } = this.state;
    if (toHome) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <div className="container">
          <div className="welcome">
            <h3>Welcome To The Would You Rather App</h3>
            <p>Please sign in to continue</p>
          </div>
          <hr />
          <div className="welcome">
            <img src={logo} className="logo" alt="" />
            <h2>Sign in</h2>
            <form onSubmit={this.handleSubmit}>
              <Select
                options={persons}
                onChange={this.handleChange}
                autoFocus={true}
              />
              <button
                type="submit"
                disabled={selectedOption === null}
                className="btn-signin"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    persons: Object.keys(users).map((user) => {
      return {
        value: users[user].id,
        label: users[user].name,
        avatar: users[user].avatarURL,
        answers: users[user].answers,
        questions: users[user].questions,
      };
    }),
    users,
  };
}

export default connect(mapStateToProps)(Signin);
