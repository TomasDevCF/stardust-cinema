import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Movie from "./ListComponents/Movie";

export default function MoviesType() {
  const { type } = useParams();

  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(100);

  function changePage(e, typpe, num) {
    e.preventDefault();
    if (typpe === "sum") {
      if (!(page + num > maxPage)) {
        setPage(page + num);
        setCount(0);
      }
    } else {
      if (!(page - num < 1)) {
        setPage(page - num);
        setCount(0);
      }
    }
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTFmZWEzZDJiNjM1NDkwYjZmMDIyNjU5MjE4Y2JmOSIsInN1YiI6IjY0YzZjNGYxOTVjZTI0MDEwMTJmYTQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LUn4EW9aJJ7WVXkEoCb3y8v34qWlrD7wkXvl6stkDQM",
    },
  };

  useEffect(() => {
    if (count === 0) {
      fetch(
        `https://api.themoviedb.org/3/movie/${type}?language=es&page=${
          page > 1 ? page + 1 : page
        }`,
        options
      )
        .then((response) => response.json())
        .then((r) => {
          setData(r.results.slice(0, 18));
          setMaxPage(r.total_pages);
        })
        .catch((err) => console.error(err));
    }
  }, [count]);

  useEffect(() => {
    setCount(count + 1);
  }, [data]);

  return (
    <main className="px-3">
      <div className="title-mt position-relative d-flex align-items-center justify-content-center">
        <Link
          to="/movies"
          className="text-start position-absolute left btn btn-primary"
        >
          <i className="fa-solid fa-angle-left"></i> Regresar
        </Link>
        <h1 className="text-center">
          {type === "popular"
            ? "Populares"
            : type === "top_rated"
            ? "Mejores calificadas"
            : type === "now_playing"
            ? "Todas las películas"
            : "No se ha podido encontrar este tipo de película"}
        </h1>
      </div>
      <div className="movies mt">
        <div className="row text-center m-0 justify-content-evenly ">
          {data &&
            data.map((m) => {
              return (
                <Movie
                  movie={m}
                  className="col-2 my-3"
                  date={m.release_date}
                  picture={m.poster_path}
                  votecount={m.vote_average}
                  title={m.title}
                  key={m.id}
                />
              );
            })}
        </div>
      </div>
      <div className="pagination-mt mb-5 mt-3">
        <nav>
          <ul className="pagination justify-content-end me-5">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <a
                onClick={(e) => {
                  changePage(e, "res", 1);
                }}
                className="page-link"
                href="#"
              >
                Anterior
              </a>
            </li>

            <li className={`page-item ${page + 1 > maxPage ? "disabled" : ""}`}>
              <a
                onClick={(e) => {
                  changePage(e, "sum", 1);
                }}
                className="page-link"
                href="#"
              >
                {page + 1}
              </a>
            </li>

            <li className={`page-item ${page + 2 > maxPage ? "disabled" : ""}`}>
              <a
                onClick={(e) => {
                  changePage(e, "sum", 2);
                }}
                className="page-link"
                href="#"
              >
                {page + 2}
              </a>
            </li>

            <li className={`page-item ${page + 3 > maxPage ? "disabled" : ""}`}>
              <a
                onClick={(e) => {
                  changePage(e, "sum", 3);
                }}
                className="page-link"
                href="#"
              >
                {page + 3}
              </a>
            </li>

            <li className={`page-item ${page + 1 > maxPage ? "disabled" : ""}`}>
              <a
                onClick={(e) => {
                  changePage(e, "sum", 1);
                }}
                className="page-link"
                href="#"
              >
                Siguiente
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
