//React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Navigate, HashRouter } from "react-router-dom";

//Components
import App from './App.jsx'
import Header from "./Components/Header.jsx";
import List from "./Components/List.jsx";
import Footer from "./Components/Footer.jsx";
import Favorites from './Components/Favorites.jsx';
import Search from './Components/Search.jsx';
import Category from './Components/Category.jsx';
import MoviesType from './Components/MoviesType.jsx';
import UnitMovie from './Components/UnitMovie.jsx';
import { ToastContainer } from "react-toastify";


//Codigo
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <HashRouter >
      
        <Header/>
        <ToastContainer
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
            <Route path='/' element={<App/>} />
            <Route path='/movie' element={<Navigate to={"/"}/>} />
            <Route path='/movie/:mid' element={<UnitMovie/>} />
            <Route path='/movies' element={<List/>} />
            <Route path='/category' element={<Navigate to={"/"}/>} />
            <Route path='/category?/:id' element={<Category/>} />
            <Route path='/movies/:type' element={<MoviesType/>} />
            <Route path='/favorites' element={<Favorites/>} />
            <Route path='/search/:query?' element={<Search/>} />
            <Route path='*' element={<Navigate to={"/"}/>}/>
        </Routes>
        
      
    </HashRouter>
    <Footer/>
  </>
)
