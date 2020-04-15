import React from "react";
import { pasreQuery } from "utils/index";
import DirectChatContainer from "containers/DirectChatContainer";
import Layout from "components/Layout";

const Home = (props) => {
  const { p } = pasreQuery(props.location);

  return <Layout>{p ? <DirectChatContainer userId={p} /> : null}</Layout>;
};

export default Home;
