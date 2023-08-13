import { useEffect, useState } from "react";
import Movie from "./ListComponents/Movie";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTFmZWEzZDJiNjM1NDkwYjZmMDIyNjU5MjE4Y2JmOSIsInN1YiI6IjY0YzZjNGYxOTVjZTI0MDEwMTJmYTQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LUn4EW9aJJ7WVXkEoCb3y8v34qWlrD7wkXvl6stkDQM",
  },
};

export default function Search() {
  const navigate = useNavigate();
  const { query } = useParams();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(100);

  function changePage(e, typpe, num) {
    console.log(e);
    e.preventDefault();

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
    if (query == "search") {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es&page=${page}&sort_by=popularity.desc`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          navigate("/");
          setMaxPage(response.total_pages);
          setData(response.results);
          
        })
        .catch((err) => console.error(err));
    } else if (query) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=es&page=${page}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.results.length == 0) {
            toast.error("¡No hay película con ese nombre!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            navigate("/");
          }
          setData(response.results);
          setMaxPage(response.total_pages);
          
        })
        .catch((err) => console.error(err));
    }
  }, [query, page]);

  useEffect(() => {
    setPage(1)
  }, [query]);

  return (
    <main>
      <div className="titlte-mt">
        <h1 className="text-center">Resultado de tu búsqueda</h1>
      </div>
      <div className="movies mt">
        <div className="row text-center m-0 mx-3 justify-content-evenly ">
          {data &&
            data.map((e) => {
              return (
                <Movie
                  className="mb-3"
                  key={e.id}
                  date={e.release_date}
                  movie={e}
                  picture={e.poster_path}
                  title={e.title}
                  votecount={e.vote_average}
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
