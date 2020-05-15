import decode from "jwt-decode";
import { wsLink, client } from "client";

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

export const logout = (history) => {
  authTokens.remove();
  wsLink.subscriptionClient.close();
  client.resetStore();
  if (history) history.push("/login");
};
