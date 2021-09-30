import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
  render() {
    const { page } = this.props;
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Oops You Are Not Signed In</h3>
        <p
          style={{
            cursor: "pointer",
            color: "white",
            textAlign: "center",
          }}
        >
          <Link to={{ pathname: "/", state: { from: {page} } }}>
            Click here to Sign up
          </Link>
        </p>
      </div>
    );
  }
}
function mapStateToProps(state, { page }) {
  return {
    state,
    page,
  };
}

export default connect(mapStateToProps)(NotFound);
