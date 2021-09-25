import React from "react";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
  render() {
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
          <Link to="/signin">Click here to Sign up </Link>
        </p>
      </div>
    );
  }
}

export default NotFound;
