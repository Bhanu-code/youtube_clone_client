import axios from "axios";

import { loginFail, loginStart, loginSuccess, logOut } from '../redux/userRedux';
import { getCookie } from "./getCookie";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const options = {
  params: {
    maxResults: '50'
  },
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchData = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;

}

export const loginUser = async (doc, dispatch) => {
  dispatch(loginStart());

  try {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, doc);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFail());
  }

}

export const registerUser = async (doc) => {

  try {
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, doc);
    if (data === "registered") {
      alert("Successfully Registered");
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export const logoutUser = async (dispatch) => {

  try {
    dispatch(logOut());
  } catch (error) {
    console.log(error);
  }
}

export const addToHistory = async (doc) => {
  console.log(doc)
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/history`, doc);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export const getHistory = async () => {
  const userId = getCookie('userId')
  const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/history/${userId}`);
  // console.log(data)
  return data;
}

export const clearHistory = async () => {
  const userId = getCookie('userId')
  const { data } = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/history/${userId}`);
  // console.log(data)
  window.location.href = '/'
}

export const fetchHistory = async (videoId) => {
  const { data } = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: 'contentDetails,snippet,statistics',
      id: videoId
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  })
  console.log(data)
  return data;

}

export const getWatchlist = async (videoId) => {
  const { data } = await axios.get(`${BASE_URL}/videos`, {
    params: {
      part: 'contentDetails,snippet,statistics',
      id: videoId
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  })
  console.log(data)
  return data;

}

export const deleteWatchlist = async () => {
  const userId = getCookie('userId')
  const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/watchlist/${userId}`);
  // console.log(data)
  window.location.href = '/'
}

