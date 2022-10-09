import ApiService from "./apiService";
export const ShowService = {
  getShows() {
    return ApiService.get("/shows");
  },
  getSearchResults(query: string) {
    return ApiService.get(`/search/shows?q=${query}`);
  },
};
