import axios from "@/plugins/axios";
import IDs from "@/store/mock/imdb_top";
const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPrePage: 12,
    currentPage: 1,
  },
  getters: {
    slisedIds: ({ top250IDs }) => (from, to) =>top250IDs.slice(from,to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPrePage: ({ moviesPrePage }) => moviesPrePage,
  },
  mutations: {},
  actions: {
    async fetchMovies({ getters }) {
      const {currentPage, moviesPrePage, slisedIds} = getters;
      const from = currentPage * moviesPrePage - moviesPrePage;
      const to = currentPage * moviesPrePage;
      const moviesTofetch = slisedIds(from, to);
      console.log(moviesTofetch);
      const responce = await axios.get("/", {
        params: {
          i: "?i=tt0111161"
        },
      });
      console.log(responce);
    },
  },
};
export default moviesStore;