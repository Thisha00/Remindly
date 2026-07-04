let accessToken = null;
let refreshToken = null;

export const setTokens = (access, refresh) => {
  console.log("token update");
  accessToken = access;
  refreshToken = refresh;
};

export const getAccessToken = () => accessToken;

export const getRefreshToken = () => refreshToken;

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
};
