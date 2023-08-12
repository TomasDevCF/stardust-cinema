import MovieList from "./ListComponents/MovieList";

export default function List() {
  return (
    <>
      <main className="list-main mb-5">
        <div className="title-list">
          <h1>Listado de películas</h1>
        </div>

        <MovieList
          fecthlink={
            "https://api.themoviedb.org/3/movie/popular?language=es&page=1"
          }
          redirect={"/movies/popular"}
          type={"Populares"}
        />
        <MovieList
          fecthlink={
            "https://api.themoviedb.org/3/movie/now_playing?language=es&page=1"
          }
          redirect={"/movies/now_playing"}
          type={"Todas las películas"}
        />
        <MovieList
          fecthlink={
            "https://api.themoviedb.org/3/movie/top_rated?language=es&page=1"
          }
          redirect={"/movies/top_rated"}
          type={"Mejores calificadas"}
        />
      </main>
    </>
  );
}
