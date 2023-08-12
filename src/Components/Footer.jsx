

export default function Footer() {
  return (
    <footer className="pt-4 pb-2 w-100 row m-0 d-flex">
      <div className="left-f col-md-7 col-12 m-0">
        <h1>Stardust Cinema</h1>
        <p style={{ fontWeight: "bold" }}>
          Cartelera de cines por Stardus Cinema
        </p>
        <p>
          Sumérgete en el mundo mágico del cine a través de "Stardust Cinema",
          tu portal en línea para descubrir la magia del cine. Nuestra
          plataforma te lleva en un emocionante viaje a través de las infinitas
          películas que el cine tiene para ofrecer, todo ello desde la comodidad
          de tu hogar.
        </p>
      </div>
      <div className="right-f col-md-5 col-12 text-center">
        <h3>Redes sociales</h3>
        <div className="icons">
          <a
            target="_blank"
            href="https://wa.me/5493512310685"
            className="fa-brands fa-whatsapp-square"
          ></a>
          <a
            target="_blank"
            href="https://www.instagram.com/tomasontivero10/"
            className="fa-brands fa-instagram-square"
          ></a>
          <a
            target="_blank"
            href="https://github.com/TomasDevCF/"
            className="fa-brands fa-github-square"
          ></a>
        </div>
        <p className="mt-2">
          Hecho con el <i className="fa-solid fa-heart"></i> por{" "}
          <a href="https://github.com/TomasDevCF/">@tomasdevcf</a> desde
          Argentina, Córdoba.
        </p>
      </div>
    </footer>
  );
}
