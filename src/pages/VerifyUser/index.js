import React from "react";
import { pasreQuery, authTokens } from "utils/index";
import { useVerifyUserMutation } from "graphql/generated.tsx";

const VerifyUser = (props) => {
  const [verifyUser] = useVerifyUserMutation({
    onCompleted: async (data) => {
      authTokens.set(data.verifyUser);
      props.history.push("/me");
    },
    onError: (err) => {
      props.history.push("/login");
      console.log("verifyUserERROR", err);
    },
  });

  React.useEffect(() => {
    const { token } = pasreQuery(props.location);
    verifyUser({ variables: { secret: token } });
  }, [verifyUser]);

  return null;
};

export default VerifyUser;
