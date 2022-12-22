import axios from "../utils/axiosInstance";

export const fetchGames = async (username) => {
  try {
    const response = await axios.get(`/game?username=${username}`);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const newGame = async (data) => {
  try {
    const response = await axios.post("/game", data);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const updateGame = async ({ id, data, username }) => {
  try {
    const response = await axios.patch(
      `/game?id=${id}&username=${username}`,
      data
    );
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getSingleGame = async (id) => {
  const response = await axios.get(`/game/${id}`);
  return response.data;
};
