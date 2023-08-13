//React
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { ContextProvider } from "./Context.jsx";
//Components
import App from "./App.jsx";
import Header from "./Components/Header.jsx";
import List from "./Components/List.jsx";
import Footer from "./Components/Footer.jsx";
import Favorites from "./Components/Favorites.jsx";
import Search from "./Components/Search.jsx";
import Category from "./Components/Category.jsx";
import MoviesType from "./Components/MoviesType.jsx";
import UnitMovie from "./Components/UnitMovie.jsx";
import { ToastContainer } from "react-toastify";

//Codigo
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ContextProvider>
      <HashRouter basename="/">
        <Header />
        <ToastContainer
          style={{ top: "70px" }}
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/movie" element={<Navigate to={"/"} />} />
          <Route path="/movie/:mid" element={<UnitMovie />} />
          <Route path="/movies" element={<List />} />
          <Route path="/category" element={<Navigate to={"/"} />} />
          <Route path="/category?/:id" element={<Category />} />
          <Route path="/movies/:type" element={<MoviesType />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search/:query?" element={<Search />} />
        </Routes>

        <Footer />
      </HashRouter>
    </ContextProvider>
  </>
);
