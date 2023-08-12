import { useEffect, useState } from "react";
import "./SCSS/style.css";
import { useNavigate } from "react-router-dom";

function App() {
  // https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg

  const [images, setImages] = useState(null);
  const navigate = useNavigate();

  function search(e) {
    if (e.key === "Enter" && e.target.value.trim().length !== 0) {
      navigate(`/search/${e.target.value.trim()}`);
      e.target.value = "";
    }
  }

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTFmZWEzZDJiNjM1NDkwYjZmMDIyNjU5MjE4Y2JmOSIsInN1YiI6IjY0YzZjNGYxOTVjZTI0MDEwMTJmYTQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LUn4EW9aJJ7WVXkEoCb3y8v34qWlrD7wkXvl6stkDQM",
      },
    };

    fetch("https://api.themoviedb.org/3/discover/movie", options)
      .then((response) => response.json())
      .then((response) => {
        setImages(response.results.slice(0, 3));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <main className="container-fluid th position-relative ">
        {images ? (
          <>
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      images[0].backdrop_path
                    }
                    width={"100%"}
                    alt={images[0].original_title}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      images[1].backdrop_path
                    }
                    width={"100%"}
                    alt={images[1].original_title}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      images[2].backdrop_path
                    }
                    width={"100%"}
                    alt={images[2].original_title}
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Anteriorious</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Anterior</span>
              </button>
            </div>
            <div
              id="carouselExampleControls2"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      images[0].poster_path
                    }
                    width={"100%"}
                    alt={images[0].original_title}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      images[1].poster_path
                    }
                    width={"100%"}
                    alt={images[1].original_title}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      images[2].poster_path
                    }
                    width={"100%"}
                    alt={images[2].original_title}
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls2"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Anteriorious</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls2"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Anterior</span>
              </button>
            </div>
          </>
        ) : null}

        <div className="d-flex justify-content-center">
          <div className="center d-flex flex-column align-items-center text-center position-absolute top-app">
            <div className="up">
              <h1>STARDUST CINEMA</h1>
              <h5>La magia del cine en tus manos.</h5>
            </div>
            <div className="down pt-3 w-100">
              <h4>¡Busca tu película favorita!</h4>
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
