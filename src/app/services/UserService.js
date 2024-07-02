import axios from "axios";
import { METHOD } from "../context/constant";
import { API_URL, STORAGE } from "../utils/util";

const ENDPOINT = {
  SIGN_IN: `${API_URL}/user/sign-in`,
  GET_MY_BLOG: `${API_URL}/post/our-blog?userId=${STORAGE.GET("userId")}`,
  DEFAULT_POST: `${API_URL}/post`,
  EDIT_POST: (postId) => `${API_URL}/post/${postId}`,
  DELETE_POST: (postId) => `${API_URL}/post/${postId}`,
};

const UserService = {
  signIn: (reqData) => {
    return axios({
      method: METHOD.POST,
      url: ENDPOINT.SIGN_IN,
      data: reqData,
    });
  },

  createPost: (reqData) => {
    return axios({
      method: METHOD.POST,
      url: ENDPOINT.DEFAULT_POST,
      data: reqData,
    });
  },

  editPost: (postId, reqData) => {
    return axios({
      method: METHOD.PATCH,
      url: ENDPOINT.EDIT_POST(postId),
      data: reqData,
    });
  },

  getMyBlog: () => {
    return axios({
      method: METHOD.GET,
      url: ENDPOINT.GET_MY_BLOG,
    });
  },

  getAllBlog: () => {
    return axios({
      method: METHOD.GET,
      url: ENDPOINT.DEFAULT_POST,
    });
  },

  deleteBlog: (postId) => {
    return axios({
      method: METHOD.DELETE,
      url: ENDPOINT.DELETE_POST(postId),
    });
  },
};

export default UserService;
