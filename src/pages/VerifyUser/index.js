import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { VERIFY_USER } from "graphql/mutations";
import { connect } from "react-redux";
import { dispatchLogin, dispatchLogout } from "redux/actions";
import { pasreQuery } from "utils/index";

const VerifyUser = (props) => {
  const [verifyUser] = useMutation(VERIFY_USER);

  React.useEffect(() => {
    const { token } = pasreQuery(props.location);
    verifyUser({ variables: { secret: token } })
      .then(({ data }) => props.dispatchLogin(data.verifyUser))
      .catch((err) => {
        props.dispatchLogout();
      })
      .finally(() => props.history.push("/me"));
  }, [props, verifyUser]);

  return null;
};

export default connect(null, (dispatch) => ({
  dispatchLogin: (data) => dispatch(dispatchLogin(data)),
  dispatchLogout: () => dispatch(dispatchLogout()),
}))(VerifyUser);
