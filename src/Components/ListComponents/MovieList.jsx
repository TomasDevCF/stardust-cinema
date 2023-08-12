
import { useState, useEffect } from "react";
import Movie from "./Movie.jsx";
import { Link } from "react-router-dom";
export default function MovieList({ type, redirect, fecthlink }) {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTFmZWEzZDJiNjM1NDkwYjZmMDIyNjU5MjE4Y2JmOSIsInN1YiI6IjY0YzZjNGYxOTVjZTI0MDEwMTJmYTQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LUn4EW9aJJ7WVXkEoCb3y8v34qWlrD7wkXvl6stkDQM",
      },
    };

    fetch(fecthlink, options)
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results.slice(0, 6));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="playing d-flex flex-wrap justify-content-center">
      <div className="title-playing">
        <h4 className="m-auto">{type}</h4>
        <Link className="mt-list" to={redirect}>
          Mostrar todo...
        </Link>
      </div>
      <div className="movies row mt-3 mx-3">
        {movies
          ? movies.map((m) => {
              return <Movie movie={m} className="col-2" key={m.id} date={m.release_date} id={m.id} picture={m.poster_path} title={m.title} votecount={m.vote_average}  />;
            })
          : null}
      </div>
    </div>
  );
}
