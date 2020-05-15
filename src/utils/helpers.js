import qs from "query-string";

export const errorHandler = (error) => {
  console.log(error);
};

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
