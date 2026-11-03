import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { useFavorites } from "../shared/hooks/useFavorites";
import { SavedPage } from "../pages/SavedPage";

function App() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/saved" element={<SavedPage favorites={favorites} toggleFavorite={toggleFavorite}/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
