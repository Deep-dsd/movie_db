import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { useParams } from "react-router-dom";
export const movieAPI = `https://www.omdbapi.com/?apikey=${
  import.meta.env.VITE_MOVIE_DB_API_KEY
}`;

const movieContext = createContext();

const ACTIONS = {
  HANDLE_INPUT_VALUE: "HANDLE_INPUT_VALUE",
  LOADER: "LOADER",
  ERROR_HANDLER: "ERROR_HANDLER",
  MOVIE_DATA_HANDLER: "MOVIE_DATA_HANDLER",
  SINGLE_MOVIE_ID: "SINGLE_MOVIE_ID",
  SINGLE_MOVIE_HANDLER: "SINGLE_MOVIE_HANDLER",
};
const initialState = {
  inputValue: "Batman",
  isLoading: true,
  error: { show: false, msg: "" },
  movieData: [],
  singleMovie: {},
  movieId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.HANDLE_INPUT_VALUE:
      return { ...state, inputValue: action.payload };

    case ACTIONS.MOVIE_DATA_HANDLER:
      return { ...state, movieData: action.payload };

    case ACTIONS.LOADER:
      return { ...state, isLoading: action.payload };

    case ACTIONS.ERROR_HANDLER:
      return { ...state, error: action.payload };

    case ACTIONS.SINGLE_MOVIE_ID:
      return { ...state, movieId: action.payload };

    case ACTIONS.SINGLE_MOVIE_HANDLER:
      return { ...state, singleMovie: action.payload };
    default:
      throw new Error(`${action.type} Not Found`);
  }
};
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mounted = useRef(false);

  const singleMovieId = (id = null) => {
    dispatch({ type: ACTIONS.SINGLE_MOVIE_ID, payload: id });
  };

  const inputHandler = (e) => {
    dispatch({ type: ACTIONS.HANDLE_INPUT_VALUE, payload: e.target.value });
  };

  //Fetching Movie Data
  const movieFetcher = async (url) => {
    dispatch({ type: ACTIONS.LOADER, payload: true });
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True" && !state.movieId) {
        dispatch({ type: ACTIONS.MOVIE_DATA_HANDLER, payload: data.Search });
        dispatch({
          type: ACTIONS.ERROR_HANDLER,
          payload: { show: false, msg: "" },
        });
      }
      if (data.Response === "True" && state.movieId) {
        dispatch({ type: ACTIONS.SINGLE_MOVIE_HANDLER, payload: data });
        dispatch({
          type: ACTIONS.ERROR_HANDLER,
          payload: { show: false, msg: "" },
        });
      } else {
        dispatch({
          type: ACTIONS.ERROR_HANDLER,
          payload: { show: true, msg: data.Error },
        });
      }

      dispatch({ type: ACTIONS.LOADER, payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: ACTIONS.LOADER, payload: false });
    }
  };

  useEffect(() => {
    movieFetcher(`${movieAPI}&s=${state.inputValue}`);
  }, [state.inputValue]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    movieFetcher(`${movieAPI}&i=${state.movieId}`);
  }, [state.movieId]);

  return (
    <movieContext.Provider value={{ ...state, inputHandler, singleMovieId }}>
      {children}
    </movieContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(movieContext);
};
