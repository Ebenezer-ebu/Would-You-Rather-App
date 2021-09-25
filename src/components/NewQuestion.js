import React from "react";
import { connect } from "react-redux";
import { newQuestion } from "../actions/questions";
import NotFound from "./NotFound";

class NewQuestion extends React.Component {
  state = { optionOneText: "", optionTwoText: "" };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState((prev) => ({
      ...prev,
      [e.target.name] : value,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      author: this.props.authedUser.selectedOption.value,
      optionOneText: this.state.optionOneText,
      optionTwoText: this.state.optionTwoText,
    };
    this.props.dispatch(newQuestion(info));
    this.props.history.push("/");
  }

  render() {
    const { authedUser } = this.props;
    if (authedUser === null) {
      return <NotFound />;
    }
    return (
      <>
        <div className="container">
          <h1>Create Question</h1>
          <hr className="rule" />
          <p>Complete the question</p>
          <h3>Would you Rather...</h3>
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="form-control"
              name="optionOneText"
              value={this.state.optionOneText}
              placeholder="Enter Option One Text Here"
              onChange={this.handleChange}
            />
            <hr className="hr-text" data-content="OR" />
            <input
              type="text"
              className="form-control"
              name="optionTwoText"
              value={this.state.optionTwoText}
              placeholder="Enter Option Two Text Here"
              onChange={this.handleChange}
            />
            <br />
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
