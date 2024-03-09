import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "./context";

const SingleMovie = () => {
  const { movieId } = useParams();
  const {
    singleMovieId,
    isLoading,
    error,
    singleMovie: movie,
  } = useGlobalContext();
  // const [movie, setMovie] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState({ show: false, msg: "" });

  // const fetchMovie = async (url) => {
  //   try {
  //     const res = await fetch(url);
  //     const data = await res.json();

  //     if (data.Response === "False") {
  //       setError({ show: true, msg: data.Error });
  //       setIsLoading(false);
  //     } else {
  //       setMovie(data);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    singleMovieId(movieId);
    // fetchMovie(`${movieAPI}&i=${movieId}`);
  }, [movieId]);

  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn" onClick={() => singleMovieId()}>
          back to movies
        </Link>
      </div>
    );
  }

  const { Poster: poster, Title: title, Plot: plot, Year: year } = movie;
  return (
    <section className="single-movie">
      <img src={poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to="/" className="btn" onClick={() => singleMovieId()}>
          back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
