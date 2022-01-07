import * as ACTIONS from "../actions";
import * as MUTATIONS from "../mutations";
import API from "../../services/api";

export default {
  state: {
    sec_headers: [],
    info_headers: [],
  },
  mutations: {
    [MUTATIONS.URL.LIST_SEC_HEADERS](state, payload) {
      state.sec_headers = payload;
    },
    [MUTATIONS.URL.LIST_INFO_HEADERS](state, payload) {
      state.info_headers = payload;
    },
  },
  actions: {
    [ACTIONS.URL.SEND]({ commit }, filter = {}) {
      return API.URL.SEND(filter).then((res) => {
        commit(MUTATIONS.URL.LIST_INFO_HEADERS, res.data.info_headers);
        commit(MUTATIONS.URL.LIST_SEC_HEADERS, res.data.sec_headers);
        return res;
      });
    },
  },
  getters: {
    getInfoHeaders: (state) => state.info_headers,
    getSecHeaders: (state) => state.sec_headers,
  },
};
