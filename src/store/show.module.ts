import { ShowService } from "@/api/showService";
import { Show, ShowObject } from "@/types/show.types";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

export enum ShowStore {
  // Mutations
  SET_LOADING = "SET_LOADING",
  SET_SHOWS = "SET_SHOWS",
  SET_SHOWS_OBJECT = "SET_SHOWS_OBJECT",
  SET_GENRES = "SET_GENRES",
  // Getters
  GET_GENRES = "GET_GENRES",
  GET_SHOWS = "GET_SHOWS",
  //Actions
  LOAD_SHOWS = "LOAD_SHOWS",
  COMPUTE_SHOW_DATA = "COMPUTE_SHOW_DATA",
}

export interface ShowStoreModel {
  genres: string[];
  shows: Show[];
  showsObject: ShowObject;
  loading: boolean;
}

const initialState = {
  genres: [],
  shows: [],
  loading: false,
  showsObject: {},
};

export const state = { ...initialState };
export const mutations: MutationTree<ShowStoreModel> = {
  [ShowStore.SET_LOADING](state: ShowStoreModel, status: boolean) {
    state.loading = status;
  },
  [ShowStore.SET_SHOWS](state: ShowStoreModel, payload: Show[]) {
    state.shows = payload;
  },
  [ShowStore.SET_SHOWS_OBJECT](state: ShowStoreModel, payload: ShowObject) {
    state.showsObject = payload;
  },
  [ShowStore.SET_GENRES](state: ShowStoreModel, payload: string[]) {
    state.genres = payload;
  },
};
export const getters: GetterTree<ShowStoreModel, unknown> = {
  [ShowStore.GET_GENRES](state) {
    return state.genres;
  },
  [ShowStore.GET_SHOWS](state) {
    return state.showsObject;
  },
};
export const actions: ActionTree<ShowStoreModel, unknown> = {
  async [ShowStore.LOAD_SHOWS]({ commit, dispatch }) {
    commit(ShowStore.SET_LOADING, true);
    const response = await ShowService.getShows();
    if (response?.data && response.data.length > 0) {
      commit(ShowStore.SET_SHOWS, response.data);
      dispatch(ShowStore.COMPUTE_SHOW_DATA, response.data);
    }
  },

  [ShowStore.COMPUTE_SHOW_DATA]({ commit }, data: Show[]) {
    const genres = new Set();
    const showsObject: ShowObject = {};
    data
      .sort((a, b) => (a.rating.average || 0) - (b.rating.average || 0)) // Sort by rating
      .forEach((show) => {
        show.genres.forEach((genre) => {
          genres.add(genre);
          if (showsObject[genre]) {
            showsObject[genre].push(show);
          } else {
            showsObject[genre] = [show];
          }
        });
      });
    commit(ShowStore.SET_SHOWS_OBJECT, showsObject);
    commit(ShowStore.SET_GENRES, [...genres]);
    commit(ShowStore.SET_LOADING, false);
  },
};

const showModule: Module<ShowStoreModel, unknown> = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations,
};
export default showModule;
