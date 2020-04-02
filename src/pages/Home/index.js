import React from "react";
import { pasreQuery } from "utils/index";
import DirectChatContainer from "containers/DirectChatContainer";

const Home = props => {
  const { p } = pasreQuery(props.location);

  return <DirectChatContainer userId={p} />;
};

export default Home;
