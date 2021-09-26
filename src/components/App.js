import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Home from "./Home";
import Signin from "./Signin";
import Board from "./LeaderBoard";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import NotFound from "./NotFound";
import Nav from "./Nav";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Signin} />
          <Route path="/home" component={Home} />
          <Route path="/leaderboard" component={Board} />
          <Route path="/add" component={NewQuestion} />
          <Route path="/questions/:question_id" component={QuestionPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps({authedUser}) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
