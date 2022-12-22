import axios from "../utils/axiosInstance";

export const registration = async (data) => {
  try {
    const response = await axios.post("/register", data);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post("/login", data);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const refresh = async (data) => {
  try {
    const response = await axios.post("/refresh", data);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const logOut = async (data) => {
  localStorage.removeItem("authToken");
  try {
    const response = await axios.post("/logout", data);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const isValidUser = async (email) => {
  const response = await axios.get(`/user?email=${email}`);
  return response.data;
};

export const finishGame = async ({ initiator, opponent }) => {
  const res1 = await axios.patch(`/user?username=${opponent}`, {
    onGoingGame: null,
  });
  const res2 = await axios.patch(`/user?username=${initiator}`, {
    onGoingGame: null,
  });

  return {
    initiator: res2.data,
    opponent: res1.data,
  };
};
