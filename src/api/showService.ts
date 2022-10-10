import ApiService from "./apiService";
export const ShowService = {
  getShows() {
    return ApiService.get("/shows");
  },
  getShowDetail(id: string) {
    return ApiService.get(`/shows/${id}`);
  },
  getSearchResults(query: string) {
    return ApiService.get(`/search/shows?q=${query}`);
  },
};
