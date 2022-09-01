import { createContext, useReducer } from 'react';

const Reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (
    action.type // what dispatch will use to refer to which functionality to use
  ) {
    case 'GET_ALL':
      return {
        ...state,
        movies: action.payload,
      };

    case 'GET_ONE':
      return {
        ...state,
        movie: action.payload, // data coming in for state manipulation
      };

    case 'DELETE_ONE':
      return {
        ...state,
        movies: state.movies.filter(
          (movieToBeDeleted) => movieToBeDeleted._id !== action.payload
        ),
      };
  }
};

const initialState = {
  movies: [],
  movie: {},
};

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  function getAllMovies(movies) {
    dispatch({
      type: 'GET_ALL',
      payload: movies,
    });
  }

  function getOneMovie(movie) {
    dispatch({
      type: 'GET_ONE',
      payload: movie,
    });
  }

  function deleteMovies(id) {
    dispatch({
      type: 'DELETE_ONE',
      payload: id,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        getAllMovies,
        getOneMovie,
        deleteMovies,
        movies: state.movies,
        movie: state.movie,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
