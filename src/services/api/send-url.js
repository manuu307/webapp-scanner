import axios from "axios";
// import Vue from "vue";

const URL = {
  SEND: (payload) => {
    return axios.post("http://192.168.1.2:5000/url", {
      payload: payload,
    });
  },
};

export default URL;
