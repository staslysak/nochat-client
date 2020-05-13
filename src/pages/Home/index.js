import React from "react";
import { pasreQuery } from "utils/index";
import DirectChatContainer from "containers/DirectChatContainer";
import Layout from "components/Layout";

const Home = ({ location }) => {
  const { p: userId } = pasreQuery(location);

  return (
    <Layout>{userId ? <DirectChatContainer userId={userId} /> : null}</Layout>
  );
};

export default Home;
