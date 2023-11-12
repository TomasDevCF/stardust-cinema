import { useEffect, useState } from "react";
import queryString from "query-string"
import { Link, useNavigate, useParams } from "react-router-dom";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTFmZWEzZDJiNjM1NDkwYjZmMDIyNjU5MjE4Y2JmOSIsInN1YiI6IjY0YzZjNGYxOTVjZTI0MDEwMTJmYTQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LUn4EW9aJJ7WVXkEoCb3y8v34qWlrD7wkXvl6stkDQM'
  }
}

export default function UnitMovie() {
  const {movie_id} = useParams()
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const parsed = queryString.parse(location.hash)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=es`, options)
    .then(response => response.json())
    .then(response => {
        if (response.success == false) {
          navigate("/")
        }
        setData(response)
      
    })
    .catch(err =>{
      console.error(err);
    });
  }, [])

  return (
    <main className="main-mid position-relative">
      
      {data && 
      <>
        <div className={`img-top${!data.backdrop_path ? "" : " margin-t"}`}>
          {data.backdrop_path && <img className="img-mid" width={"100%"} src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} alt={data.title} />}
        </div>
        <div className="detail-movie position-relative row w-100 text-center text-lg-start">
          <div className="left-mid col-lg-5 col-12 p-0 text-start">
            <Link to={parsed ? parsed[Object.keys(parsed)[0]].slice(1, parsed.length) : "/movies"} className="ms-5 mt-4 btn btn-primary"><i className="fa-solid fa-angle-left"></i> Regresar</Link>
            <img width={"80%"} className="mt-3" src={data.poster_path ? `https://image.tmdb.org/t/p/original/${data.poster_path}` : "https://fondosmil.com/fondo/32041.jpg"} alt={data.title} />
          </div>
          <div className="right-mid col-lg-7 col-12 p-0 px-3">
            <h1>{data.title}</h1>
            <h4 className="color-two mt-3" >Descripción</h4>
            <p>{data.overview}</p>
            <h4 className="color-two mt-4" >{data.genres.map((e, index) => {
              return <span key={e.id}><Link to={`/category/${e.id}`} >{e.name}</Link>{data.genres[index + 1] ? ", " : " "}</span>
            })}</h4>
            <p>{data.tagline}</p>
            <div className="data-row">
              <div className="col-12 d-flex justify-content-center justify-content-lg-start p-0 mt-4">
                <div className="data col-4">
                  <p>Fecha de estreno:</p>
                  <h4>{data.release_date}</h4>
                </div>
                <div className="data col-4">
                  <p>Duración:</p>
                  <h4>{data.runtime} Mins</h4>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center justify-content-lg-start p-0 mt-2">
                <div className="data col-4">
                  <p>Cantidad de votos:</p>
                  <h4>{data.vote_count}</h4>
                </div>
                <div className="data col-4 ">
                  <p>Promedio de votos:</p>
                  <h4 className="d-flex align-items-center position-relative justify-content-center justify-content-lg-start">{data.vote_average} / 10 <i className="ms-2 fa-solid fa-star"></i></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      }
      
    </main>
  )
}