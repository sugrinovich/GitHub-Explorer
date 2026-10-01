import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { useFavorites } from "../shared/hooks/useFavorites";
import { SavedPage } from "../pages/SavedPage";

function App() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/SavedPage" element={<SavedPage favorites={favorites} toggleFavorite={toggleFavorite}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
