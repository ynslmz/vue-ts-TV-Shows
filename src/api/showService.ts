import ApiService from "./apiService";
export const ShowService = {
  getShows() {
    return ApiService.get("shows?Show[rating]=70&Show[sort]=7");
  },
};
