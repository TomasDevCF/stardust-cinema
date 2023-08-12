import { useEffect, useState } from "react";
import { useFavoriteContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Movie({
  movie,
  title,
  date,
  picture,
  votecount,
  className,
}) {
  let vote = "red";

  const { favoriteList, setFavoriteList } = useFavoriteContext();
  const navigate = useNavigate();

  const [iClass, setIClass] = useState(
    "fa-regular fa-heart d-flex align-items-center justify-content-center"
  );

  function onClickHeart() {
    if (favoriteList != []) {
      if (
        iClass ===
        "fa-regular fa-heart d-flex align-items-center justify-content-center"
      ) {
        setFavoriteList([...favoriteList, movie]);
        toast.success("¡Película guardada en favoritos!", {
          
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setFavoriteList(favoriteList.filter((e) => e.id !== movie.id));
      }
    }

    setIClass(
      iClass ===
        "fa-solid fa-heart d-flex align-items-center justify-content-center"
        ? "fa-regular fa-heart d-flex align-items-center justify-content-center"
        : "fa-solid fa-heart d-flex align-items-center justify-content-center"
    );
  }

  useEffect(() => {
    if (favoriteList) {
      for (let i = 0; i < favoriteList.length; i++) {
        if (favoriteList[i].id === movie.id) {
          setIClass(
            "fa-solid fa-heart d-flex align-items-center justify-content-center"
          );
          break;
        }
      }
    }
  }, []);

  if (votecount > 0 && votecount < 3.4) {
    vote = "red";
  } else if (votecount > 3.3 && votecount < 7) {
    vote = "orange";
  } else {
    vote = "green";
  }

  return (
    <div
      className={`movie my-2 ${
        className ? className : ""
      } col-6 col-md-4 col-lg-2`}
    >
      <div
        onClick={() => navigate(`/movie/${movie.id}`)}
        className="of w-100 h-100 overflow-hidden"
      >
        <div>
          <img
            width={picture ? "100%" : "85%"}
            src={
              picture
                ? `https://image.tmdb.org/t/p/w200${picture}`
                : "https://fondosmil.com/fondo/32041.jpg"
            }
            alt={title}
          />
        </div>
        <div
          className={`in-image-m d-flex flex-column ${picture ? "" : "left-7"}`}
        >
          <div className="heart">
            <i
              onClick={(e) => {
                e.stopPropagation();
                onClickHeart();
              }}
              className={iClass}
            ></i>
          </div>
          <div className="other">
            <p>{title}</p>
            <p>{date}</p>
          </div>
        </div>
      </div>
      <div className={`votes ${votecount === 0 ? "green" : vote}`}>
        <p>{votecount === 0 ? "*" : votecount.toString().slice(0, 3)}</p>
      </div>
    </div>
  );
}
