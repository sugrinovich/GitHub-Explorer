import { useState, useEffect } from "react";
import type { GitHubRepository } from "../types/types";

export function useFavorites() {
    
    const [favorites, setFavorites] = useState<GitHubRepository[]>(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    } 
    );

    function toggleFavorite(repository: GitHubRepository) {
        setFavorites(prev =>
            prev.some(fav => fav.id === repository.id)
                ? prev.filter(fav => fav.id !== repository.id)
                : [...prev, repository]
        );
    }

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    return { favorites, toggleFavorite };
}
