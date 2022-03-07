import React, {useEffect} from "react";
import {connect} from "react-redux";
import {logout} from "../../store/actions/auth";
import {Navigate} from "react-router-dom";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Navigate replace to={'/'} />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);