import React from "react";
import { pasreQuery } from "utils/index";
import DirectChatContainer from "containers/DirectChatContainer";

const Home = (props) => {
  const { p } = pasreQuery(props.location);
  return p ? <DirectChatContainer userId={p} /> : null;
};

export default Home;
