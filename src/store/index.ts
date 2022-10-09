import { ActionTree, createStore, GetterTree, MutationTree } from "vuex";
import showModule from "./show.module";

export enum RootStore {
  SET_CONTAINER = "SET_CONTAINER",
  SAVE_CONTAINER_WIDTH = "SAVE_CONTAINER_WIDTH",
  GET_CONTAINER_WIDTH = "GET_CONTAINER_WIDTH",
}

interface StoreModel {
  containerWidth: number;
}

const initialState: StoreModel = {
  containerWidth: 1230,
};

const state = { ...initialState };

const mutations: MutationTree<StoreModel> = {
  [RootStore.SET_CONTAINER](state, payload) {
    state.containerWidth = payload;
  },
};

const getters: GetterTree<StoreModel, unknown> = {
  [RootStore.GET_CONTAINER_WIDTH](state) {
    return state.containerWidth;
  },
};

const actions: ActionTree<StoreModel, unknown> = {
  [RootStore.SAVE_CONTAINER_WIDTH]({ commit }, width: number) {
    commit(RootStore.SET_CONTAINER, width);
  },
};

export default createStore({
  state,
  actions,
  mutations,
  getters,
  modules: {
    shows: showModule,
  },
});
