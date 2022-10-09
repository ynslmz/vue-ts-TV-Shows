import { createStore } from "vuex";
import showModule from "./show.module";
export default createStore({
  modules: {
    shows: showModule,
  },
});
