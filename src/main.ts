import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/styles.scss";

import { ShowStore } from "./store/show.module";

/// Dependency injection Setup
store.dispatch(ShowStore.LOAD_SHOWS);

createApp(App)
  .provide("apiService", "ApiService")
  .use(store)
  .use(router)
  .mount("#app");
