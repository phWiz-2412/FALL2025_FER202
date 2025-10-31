export const movieReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "ADD_MOVIE":
      return { ...state, movies: [...state.movies, action.payload] };
    case "UPDATE_MOVIE":
      return {
        ...state,
        movies: state.movies.map((m) =>
          m.id === action.payload.id ? action.payload : m
        ),
      };
    case "DELETE_MOVIE":
      return { ...state, movies: state.movies.filter((m) => m.id !== action.payload) };
    default:
      return state;
  }
};
