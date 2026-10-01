import { Header } from "../shared/components/Header/Header";
import type { GitHubRepository } from "../shared/types/types";
import { SavedPageBody } from "../shared/components/Body/SavedPage/SavedPageBody";

interface SavedPageProps {
    favorites: GitHubRepository[];
    toggleFavorite: (repository: GitHubRepository) => void;
}

export function SavedPage({ favorites, toggleFavorite }: SavedPageProps) {
    return (
        <>
            <Header/>
            <SavedPageBody favorites={favorites} toggleFavorite={toggleFavorite}/>
        </>
    )
}