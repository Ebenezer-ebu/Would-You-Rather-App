import React from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

class Nav extends React.Component {
  removeUser = () => {
    this.props.dispatch(setAuthedUser(null));
  };
  render() {
    const { authedUser } = this.props;
    let auth;
    if (authedUser) {
      auth = (
        <>
          <li>Hello,
            {authedUser.selectedOption.label}{" "}
            <img
              className="tag-image"
              src={authedUser.selectedOption.avatar}
              alt={authedUser.selectedOption.value}
            />
          </li>
          <li onClick={this.removeUser} className="tag">
            <NavLink to="/signin" exact activeClassName="active">
              Log Out
            </NavLink>
          </li>
        </>
      );
    }
    return (
      <nav className="nav">
        <div className="inside">
          <ul>
            <li
              className="tag"
              id={window.location.pathname === "/" ? "active" : ""}
            >
              <NavLink to="/" exact activeClassName="active">
                Home
              </NavLink>
            </li>
            <li
              className="tag"
              id={window.location.pathname === "/add" ? "active" : ""}
            >
              <NavLink to="/add" exact activeClassName="active">
                New Question
              </NavLink>
            </li>
            <li
              className="tag"
              id={window.location.pathname === "/leaderboard" ? "active" : ""}
            >
              <NavLink to="/leaderboard" exact activeClassName="active">
                Leader Board
              </NavLink>
            </li>
            {auth}
          </ul>
          <hr />
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(Nav));
