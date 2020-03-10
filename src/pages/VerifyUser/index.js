import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { connect } from "react-redux";
import { VERIFY_USER } from "graphql/mutations";
import { dispatchLogin, dispatchLogout } from "redux/actions";
import { pasreQuery } from "utils/index";

const VerifyUser = props => {
  const [verifyUser] = useMutation(VERIFY_USER);

  React.useEffect(() => {
    const { token } = pasreQuery(props.location);
    verifyUser({ variables: { secret: token } })
      .then(({ data }) => props.dispatchLogin(data.verifyUser))
      .catch(() => props.dispatchLogout())
      .finally(() => props.history.push("/"));
  }, []);

  return null;
};

export default connect(null, { dispatchLogin, dispatchLogout })(VerifyUser);
