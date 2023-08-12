import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "./ListComponents/Movie";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTFmZWEzZDJiNjM1NDkwYjZmMDIyNjU5MjE4Y2JmOSIsInN1YiI6IjY0YzZjNGYxOTVjZTI0MDEwMTJmYTQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LUn4EW9aJJ7WVXkEoCb3y8v34qWlrD7wkXvl6stkDQM",
  },
};

export default function Category() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(100);
  const [category, setCategory] = useState(null);

  function changePage(typpe, num) {
    if (typpe === "sum") {
      if (!(page + num > maxPage)) {
        setPage(page + num);
      }
    } else {
      if (!(page - num < 1)) {
        setPage(page - num);
      }
    }
  }

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=es", options)
      .then((response) => response.json())
      .then((response) => {
        for (let i = 0; i < response.genres.length; i++) {
          if (response.genres[i].id == id) {
            setCategory(response.genres[i].name);
          }
        }
      })
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es&page=${page}&sort_by=popularity.desc&with_genres=${id}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.results);
        setMaxPage(response.total_pages);
      })
      .catch((err) => console.error(err));
  }, [id, page]);

  return (
    <main className="px-3">
      <div className="titlte-mt">
        <h1 className="text-center">{category && category}</h1>
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
                onClick={() => {
                  changePage("res", 1);
                }}
                className="page-link"
                href="#"
              >
                Anterior
              </a>
            </li>

            <li className={`page-item ${page + 1 > maxPage ? "disabled" : ""}`}>
              <a
                onClick={() => {
                  changePage("sum", 1);
                }}
                className="page-link"
                href="#"
              >
                {page + 1}
              </a>
            </li>

            <li className={`page-item ${page + 2 > maxPage ? "disabled" : ""}`}>
              <a
                onClick={() => {
                  changePage("sum", 2);
                }}
                className="page-link"
                href="#"
              >
                {page + 2}
              </a>
            </li>

            <li className={`page-item ${page + 3 > maxPage ? "disabled" : ""}`}>
              <a
                onClick={() => {
                  changePage("sum", 3);
                }}
                className="page-link"
                href="#"
              >
                {page + 3}
              </a>
            </li>

            <li className={`page-item ${page + 1 > maxPage ? "disabled" : ""}`}>
              <a
                onClick={() => {
                  changePage("sum", 1);
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
