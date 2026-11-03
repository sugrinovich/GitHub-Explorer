import React, { useState } from "react";
import "./RepoSearch.css"

interface RepoSearchProps {

    isLoading: boolean;
    onSearch: (search: string) => void;
    secondsLeft: number;
}

const POPULAR_SEARCHES = [
    { query: "react", color: "#da093d" },
    { query: "typescript", color: "#3178c6" },
    { query: "developer tools", color: "#8250df" },
    { query: "ai agents", color: "#56da09" },
];

export function RepoSearch({onSearch, isLoading, secondsLeft}: RepoSearchProps) {

    const [inputValue, setValue] = useState("");
    const isDisabled = isLoading || secondsLeft > 0;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isDisabled) onSearch(inputValue);
    }

    function handleTagClick(query: string) {
        setValue(query);
        onSearch(query);
    }

    return (
        <section className="repoSearch">
            <h3 className="repoSearch__title">Find your next favorite repo.</h3>
            <p className="repoSearch__description">Explore open-source projects.</p>
            <form className="repoSearch--wrapper" role="search" onSubmit={handleSubmit}>
                <span className="repoSearch__icon" aria-hidden="true">🔍</span>
                <input className="repoSearch__input"
                        type="text"
                        placeholder="Search repositories"
                        aria-label="Search repositories"
                        value={inputValue}
                        onChange={e => setValue(e.target.value)}/>
                <button
                className="repoSearch__button"
                type="submit"
                disabled={isDisabled}>
                    {isLoading ? "Loading..." : secondsLeft > 0 ? `Wait ${secondsLeft}s` : "Search repo"}
                </button>
            </form>

            <p className="repoSearch__tags">POPULAR SEARCHES:
                {POPULAR_SEARCHES.map(tag => (
                    <button key={tag.query}
                        className="repoSearch__tags--item"
                        type="button"
                        style={{ "--lang-color": tag.color } as React.CSSProperties}
                        disabled={isDisabled}
                        onClick={() => handleTagClick(tag.query)}>
                        {tag.query}
                    </button>
                ))}
            </p>
        </section>
    )
}
