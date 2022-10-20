import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/styles.scss";

import { ShowStore } from "./store/show.module";

store.dispatch(ShowStore.LOAD_SHOWS);
createApp(App).use(store).use(router).mount("#app");
