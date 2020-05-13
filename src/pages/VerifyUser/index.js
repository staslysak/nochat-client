import React from "react";
import { pasreQuery, authTokens } from "utils/index";
import { useVerifyUserMutation } from "graphql/generated.tsx";

export default ({ history, location }) => {
  const [verifyUser] = useVerifyUserMutation({
    onCompleted(data) {
      authTokens.set(data.tokens);
      history.push("/me");
    },
    onError() {
      history.push("/login");
    },
  });

  React.useEffect(() => {
    const { token: secret } = pasreQuery(location);
    verifyUser({ variables: { secret } });
  }, [verifyUser]);

  return null;
};
