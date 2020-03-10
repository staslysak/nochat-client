import qs from "query-string";
import React from "react";
import moment from "moment";

export const stringifyQuery = (location, modifiers = {}) => {
  const settings = {
    arrayFormat: "comma",
    skipNull: true,
    parseNumbers: true
  };

  let query = {
    ...qs.parse(location.search, settings),
    ...modifiers
  };

  return {
    ...location,
    search: qs.stringify(query, settings)
  };
};

export const pasreQuery = location => {
  const settings = {
    arrayFormat: "comma",
    skipNull: true,
    parseNumbers: true
  };
  return qs.parse(location.search, settings);
};

export const useRefCallback = value => {
  const [bounding, setbounding] = React.useState({});

  const ref = React.useCallback(node => {
    if (!!node) {
      setbounding(node.getBoundingClientRect());
    }
  }, []);

  return [ref, bounding];
};

export const formatDate = date => {
  return moment(+date).format("DD.MM.YY");
};
