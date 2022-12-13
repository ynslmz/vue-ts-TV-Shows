import { ShowStore } from "@/store/show.module";
import store from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function showDetailResolver(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  /// first load data
  await store.dispatch(ShowStore.LOAD_SHOW_DETAILS, to.params.id);
  next();
}
