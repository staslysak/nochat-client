import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { VERIFY_USER } from "graphql/mutations";
import { pasreQuery, authTokens } from "utils/index";

const VerifyUser = (props) => {
  const [verifyUser] = useMutation(VERIFY_USER, {
    onCompleted: async (data) => {
      authTokens.set(data.verifyUser);
      props.history.push("/me");
    },
    onError: (err) => {
      props.history.push("/login");
      console.log("VerifyUserERROR", err);
    },
  });

  React.useEffect(() => {
    const { token } = pasreQuery(props.location);
    verifyUser({ variables: { secret: token } });
  }, [verifyUser]);

  return null;
};

export default VerifyUser;
