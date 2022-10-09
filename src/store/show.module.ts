import { ShowService } from "@/api/showService";
import { Show } from "@/types/show.types";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  GET_SHOWS,
  LOAD_SHOWS,
  SET_LOADING,
  SET_SHOWS,
} from "./showModule.types";

export interface ShowStoreModel {
  shows: Show[];
  loading: boolean;
}

const initialState = {
  shows: [],
  loading: false,
};

export const state = { ...initialState };
export const mutations: MutationTree<ShowStoreModel> = {
  [SET_LOADING](state: ShowStoreModel, status: boolean) {
    state.loading = status;
  },
  [SET_SHOWS](state: ShowStoreModel, payload: Show[]) {
    state.shows = payload;
  },
};
export const getters: GetterTree<ShowStoreModel, unknown> = {
  [GET_SHOWS](state) {
    return state.shows;
  },
};
export const actions: ActionTree<ShowStoreModel, unknown> = {
  async [LOAD_SHOWS]({ commit }) {
    commit("SET_LOADING", true);
    const response = await ShowService.getShows();
    if (response?.status === 200) {
      commit("SET_SHOWS", response?.data);
    }
  },
};

const showModule: Module<ShowStoreModel, unknown> = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations,
};
export default showModule;
