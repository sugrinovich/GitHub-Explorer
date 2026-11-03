import { useState, useEffect } from "react";
import type { GitHubRepository } from "../types/types";

function readFavorites(): GitHubRepository[] {
    try {
        const saved = localStorage.getItem("favorites");
        const parsed: unknown = saved ? JSON.parse(saved) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        // В хранилище битый JSON — начинаем с пустого списка, а не роняем приложение
        return [];
    }
}

export function useFavorites() {

    const [favorites, setFavorites] = useState<GitHubRepository[]>(readFavorites);

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
