import ApiService from "./apiService";
export const ShowService = {
  getShows() {
    return ApiService.get("shows");
  },
};
