import React, { useState } from "react";
import "./RepoSearch.css"
import { getLanguageColor } from "../../utils/getLanguageColor";
getLanguageColor

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
                <span className="repoSearch__tags--item" 
                    style={{ "--lang-color": getLanguageColor("React") 
                    } as React.CSSProperties}
                    onClick={() => onSearch("react")}>
                    react
                </span>
                <span className="repoSearch__tags--item" 
                    style={{ "--lang-color": getLanguageColor("TypeScript") 
                    } as React.CSSProperties}
                    onClick={() => onSearch("typescript")}>
                    typescript
                    </span>
                <span className="repoSearch__tags--item" 
                    style={{ "--lang-color": getLanguageColor("Developer tools") 
                    } as React.CSSProperties}
                    onClick={() => onSearch("developer tools")}>
                    developer tool
                    </span>
                <span className="repoSearch__tags--item" 
                    style={{ "--lang-color": getLanguageColor("Ai agents") 
                    } as React.CSSProperties}
                    onClick={() => onSearch("ai agents")}>
                    ai agents
                </span></p>
        </section>
    )
}