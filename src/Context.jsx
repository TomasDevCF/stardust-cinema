import { createContext, useContext, useEffect, useMemo, useState } from "react";

const favoriteContext = createContext()

export function ContextProvider(props) {
  const [favoriteList, setFavoriteList] = useState([])

  useEffect(() =>{
    if (localStorage.getItem("favoriteList")) {
      setFavoriteList(JSON.parse(localStorage.getItem("favoriteList")))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList))
  }, [favoriteList])

  const value = useMemo(() => {
    return ({
      favoriteList,
      setFavoriteList
    })
  }, [favoriteList])

  return <favoriteContext.Provider value={value} {...props} />
}

export function useFavoriteContext() {
  const context = useContext(favoriteContext)

  if (!context) {
    console.error("FavoriteContext no existe, verifica que este componente es hijo de contextProvider");
  }

  return context
}