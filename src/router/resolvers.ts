import { ShowStore } from "@/store/show.module";
import store from "@/store";

export async function showDetailResolver(to: any, from: any, next: any) {
  /// first load data
  await store.dispatch(ShowStore.LOAD_SHOW_DETAILS, to.params.id);
  next();
}
