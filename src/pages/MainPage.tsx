import { MainPageBody } from "../shared/components/Body/MainPageBody";
import { Header } from "../shared/components/Header/Header";
import type { GitHubRepository } from "../shared/types/types";

interface MainPageProps {
    favorites: GitHubRepository[];
    toggleFavorite: (repository: GitHubRepository) => void;
}

export function MainPage({ favorites, toggleFavorite }: MainPageProps) {
    return (
        <>
            <Header/>
            <MainPageBody favorites={favorites} toggleFavorite={toggleFavorite}/>
        </>
    )
}
