import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/scss/styles.scss";
import { LOAD_SHOWS } from "./store/showModule.types";

/// Dependency injection Setup
store.dispatch(LOAD_SHOWS);

createApp(App)
  .provide("apiService", "ApiService")
  .use(store)
  .use(router)
  .mount("#app");
