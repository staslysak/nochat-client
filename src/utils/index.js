import qs from "query-string";
import React from "react";
import moment from "moment";

export const stringifyQuery = (location, modifiers = {}) => {
  const settings = {
    arrayFormat: "comma",
    skipNull: true,
    parseNumbers: true,
  };

  let query = {
    ...qs.parse(location.search, settings),
    ...modifiers,
  };

  return {
    ...location,
    search: qs.stringify(query, settings),
  };
};

export const pasreQuery = (location) => {
  const settings = {
    arrayFormat: "comma",
    skipNull: true,
    parseNumbers: true,
  };
  return qs.parse(location.search, settings);
};

export const useRefCallback = (value) => {
  const [bounding, setbounding] = React.useState({});

  const ref = React.useCallback((node) => {
    if (!!node) {
      setbounding(node.getBoundingClientRect());
    }
  }, []);

  return [ref, bounding];
};

export const sortByLastMessage = (a, b) => {
  return b.lastMessage.createdAt - a.lastMessage.createdAt;
};

export const formatDate = (date, prefix) => {
  if (date) {
    const currentDate = moment();
    const formatDate = moment(+date);

    const getFormat = (diff) => {
      if (diff >= 5) {
        return "DD.MM.YY";
      } else {
        return "HH:mm";
      }
    };

    const format = getFormat(currentDate.diff(formatDate, "days"));

    if (prefix) {
      return prefix + formatDate.format(format);
    }
    return formatDate.format(format);
  }
};
