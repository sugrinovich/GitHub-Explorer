import { useState } from "react";
import "./RepoSearch.css"

interface RepoSearchProps {

    isLoading: boolean;
    onSearch: (search: string) => void;
    secondsLeft: number;
}

export function RepoSearch({onSearch, isLoading, secondsLeft}: RepoSearchProps) {

    const [inputValue, setValue] = useState("");

    return (
        <section className="repoSearch">
            <h3 className="repoSearch__title">Find your next favorite repo.</h3>
            <p className="repoSearch__descrption">Explore open-source projects by language, community, and momentum.</p>
            <div className="repoSearch--wrapper">
                <span className="repoSearch__icon">🔍</span>
                <input className="repoSearch__input"
                        type="text"
                        placeholder="Search repositories"
                        onChange={e => setValue(e.target.value)}/>
                <button 
                className="repoSearch__button"
                type="button"
                onClick={() => onSearch(inputValue)}
                disabled={isLoading || secondsLeft > 30}>
                    {isLoading ? "Loading..." : secondsLeft ? `Reset at ${secondsLeft}` : "Search repo"}
                </button>
            </div>

            <p className="repoSearch__tags">POPULAR SEARCHES: 
                <span className="repoSearch__tags--item">react</span>
                <span className="repoSearch__tags--item">typescript</span>
                <span className="repoSearch__tags--item">developer tool</span>
                <span className="repoSearch__tags--item">ai agents</span></p>
        </section>
    )
}