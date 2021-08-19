import axios from "@/plugins/axios";
import IDs from "@/store/mock/imdb_top";
import mutations from "@/store/mutations";

function normalizeResponse(movies) {
  return movies.reduce((acc, movie) =>{
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const { MOVIES } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPrePage: 12,
    currentPage: 1,
    movies: {},
  },
  getters: {
    moviesList: ({ movies }) => movies,
    slisedIds: ({ top250IDs }) => (from, to) =>top250IDs.slice(from,to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPrePage: ({ moviesPrePage }) => moviesPrePage,
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    }
  },
  actions: {
    initMoviesStore: {
      handler({ dispatch }){
        dispatch('fetchMovies');
      },
      root: true,
    },
    async fetchMovies({ getters, commit }) {
      try {
        const {currentPage, moviesPrePage, slisedIds} = getters;
        const from = currentPage * moviesPrePage - moviesPrePage;
        const to = currentPage * moviesPrePage;
        const moviesTofetch = slisedIds(from, to);
        const requests = moviesTofetch.map(id => axios.get(`/?i=${ id }`));
        const response = await Promise.all(requests);
        const movies = normalizeResponse(response);
        commit(MOVIES, movies);
      } catch(error) {
        console.log(error);
      }
    },
  },
};
export default moviesStore;