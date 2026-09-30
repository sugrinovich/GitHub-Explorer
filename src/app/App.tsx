import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { useFavorites } from "../shared/hooks/useFavorites";

function App() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
