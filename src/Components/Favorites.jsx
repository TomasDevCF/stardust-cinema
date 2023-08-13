import { useState } from "react";
import { useFavoriteContext } from "../Context";
import Movie from "./ListComponents/Movie";

export default function Favorites() {
  const { favoriteList } = useFavoriteContext();

  const maxPage = favoriteList.length / 18 + 1;
  const [page, setPage] = useState(1);

  function changePage(e, typpe, num) {
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

  return (
    <main className="main-at pb-5 px-3">
      <div className="title-at">
        <h1 className="text-center">Películas favoritas</h1>
      </div>
      <div className="movies-at mt">
        {favoriteList.length == 0 ? (
          <div className="w-100 vh-70 d-flex justify-content-center text-center align-items-center">
            <h5 className="w-75 ">
              <span className="d-block">
                Para agregar una película a tus favoritos debes presionar el
                corazón
              </span>{" "}
            </h5>
          </div>
        ) : (
          <div className="row movies text-center m-0 justify-content-evenly ">
            {favoriteList &&
              favoriteList.slice(18 * (page - 1), 18 * page).map((e) => {
                return (
                  <Movie
                    className="col-2 my-3"
                    date={e.release_date}
                    movie={e}
                    picture={e.poster_path}
                    title={e.title}
                    votecount={e.vote_average}
                    key={e.id}
                  />
                );
              })}
          </div>
        )}
      </div>
      {favoriteList.length > 18 ? (
        <div className="pagination-at mt-4">
          <nav>
            <ul className="pagination justify-content-end me-5">
              <li
                onClick={(e) => {
                  changePage(e, "res", 1);
                }}
                className={`page-item ${page - 1 !== 0 ? "" : "disabled"}`}
              >
                <a href="#" className="page-link">
                  Prev
                </a>
              </li>

              {maxPage > page + 1 && (
                <li
                  onClick={() => {
                    changePage(e, "sum", 1);
                  }}
                  className="page-item"
                >
                  <a href="#" className="page-link">
                    {page + 1}
                  </a>
                </li>
              )}

              {maxPage > page + 2 && (
                <li
                  onClick={() => {
                    changePage(e, "sum", 2);
                  }}
                  className="page-item"
                >
                  <a href="#" className="page-link">
                    {page + 2}
                  </a>
                </li>
              )}

              {maxPage > page + 3 && (
                <li
                  onClick={() => {
                    changePage(e, "sum", 3);
                  }}
                  className="page-item"
                >
                  <a href="#" className="page-link">
                    {page + 3}
                  </a>
                </li>
              )}

              <li
                onClick={(e) => {
                  changePage(e, "sum", 1);
                }}
                className={`page-item ${page + 1 >= maxPage ? "disabled" : ""}`}
              >
                <a href="#" className="page-link">
                  Siguiente
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </main>
  );
}
