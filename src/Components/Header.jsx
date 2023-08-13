import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTFmZWEzZDJiNjM1NDkwYjZmMDIyNjU5MjE4Y2JmOSIsInN1YiI6IjY0YzZjNGYxOTVjZTI0MDEwMTJmYTQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LUn4EW9aJJ7WVXkEoCb3y8v34qWlrD7wkXvl6stkDQM",
  },
};

export default function Header() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeCategory, setActiveCategory] = useState(false);

  function search(e) {
    if (e.key === "Enter" && e.target.value.trim().length !== 0) {
      navigate(`/search/${e.target.value.trim()}`,);
      e.target.value = "";
    }
  }

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=es", options)
      .then((response) => response.json())
      .then((responses) => {
        setCategories(responses);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <header
      className={`w-100 max-header d-flex justify-content-between align-items-center px-3`}
    >
      <div className={`section-1 d-flex ${activeSearch ? "vs-hi" : ""}`}>
        <Link to={"/"}>
          Stardust<span> Cinema</span>
        </Link>
      </div>
      <div className="section-2 ">
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            onKeyDown={(e) => {
              search(e);
            }}
            className="border-0"
            type="search"
            name="search-movie"
            id="search-movie"
            placeholder="Busca películas..."
          />
        </span>

        <span>
          <i
            onClick={() => {
              setActiveSearch(!activeSearch);
            }}
            className="search-movil fa-solid fa-magnifying-glass"
          ></i>
          <input
            onKeyDown={(e) => {
              search(e);
            }}
            className={`border-0 ${!activeSearch ? "d-none" : ""}`}
            type="search"
            name="search-movie"
            id="search-movie"
            placeholder="Busca películas..."
          />
        </span>
      </div>
      <div className={`section-3 ${activeSearch ? "vs-hi" : ""}`}>
        {/*Todo Link*/}
        <Link to={"/favorites"} className="category btn btn-link">
          Favoritos
        </Link>
        <Link to={"/movies"} className="category btn btn-link">
          Listado
        </Link>
        <button
          onClick={() => setActiveCategory(!activeCategory)}
          className="category btn btn-link"
        >
          Categoría{" "}
          {activeCategory ? (
            <i className="fa-solid fa-caret-up"></i>
          ) : (
            <i className="fa-solid fa-caret-down"></i>
          )}
        </button>

        <div className={`category-s row ${!activeCategory ? "--disable" : ""}`}>
          {!categories ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            categories.genres.map((c) => {
              return (
                <Link key={c.id} className="col-6 sp" to={`/category/${c.id}`}>
                  {c.name}
                </Link>
              );
            })
          )}
        </div>
      </div>
    </header>
  );
}
