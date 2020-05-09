import React from "react";
import { pasreQuery } from "utils/index";
import DirectChatContainer from "containers/DirectChatContainer";
import Layout from "components/Layout";

const Home = (props) => {
  const { p: userId } = pasreQuery(props.location);

  return (
    <Layout>{userId ? <DirectChatContainer userId={userId} /> : null}</Layout>
  );
};

export default Home;
