import qs from "query-string";
import moment from "moment";
import decode from "jwt-decode";

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

export const authTokens = {
  get(selector) {
    if (selector) {
      return localStorage.getItem(selector);
    }
    return {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    };
  },
  set(tokens) {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  },
  remove() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};

export const pasreQuery = (location) => {
  const settings = {
    arrayFormat: "comma",
    skipNull: true,
    parseNumbers: true,
  };
  return qs.parse(location.search, settings);
};

export const isAuthorized = () => {
  const { accessToken, refreshToken } = authTokens.get();
  if (!accessToken || !refreshToken) {
    return false;
  }

  try {
    decode(accessToken);
    const { exp } = decode(refreshToken);
    if (Date.now() / 1000 > exp) {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
};

export const sortByLastMessage = (a, b) => {
  return b.lastMessage.createdAt - a.lastMessage.createdAt;
};

export const diffTime = (date, diff = "days") => {
  return moment().diff(+date, diff);
};

export const formatDate = (date, format = "HH:mm") => {
  if (date) {
    return moment(+date).format(format);
  }
};

export const renderDiffTimeLabel = (date) => {
  const timeDiff = diffTime(+date);

  switch (timeDiff) {
    case 0:
      return "Today";
    case 1:
      return "Yesterday";
    default:
      return formatDate(date, "MMMM D");
  }
};

export const renderTimeline = (messages) => {
  const timeline = {};

  if (messages.length) {
    messages.forEach(({ createdAt }, idx) => {
      const timeDiff = diffTime(createdAt, "days");
      if (timeline[timeDiff] === undefined) {
        timeline[timeDiff] = idx;
      }
    });
  }

  return timeline;
};
