export const setToken = (user) => {
  const token = {
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  };
  localStorage.setItem("authToken", JSON.stringify(token));
};
