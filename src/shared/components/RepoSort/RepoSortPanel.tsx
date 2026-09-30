import "./RepoSort.css"
import type {GitHubRepository} from "../../types/types";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";


interface RepoSortPanelProps {

    items: GitHubRepository[];
    onSort: (filters: {
        language: string;
        minStars: string;
        updated: string;
        sortBy: keyof GitHubRepository | "any";
    }) => void;
    setPage: Dispatch<SetStateAction<number>>;
}

export function RepoSortPanel({items, onSort, setPage}: RepoSortPanelProps) {

    const languageOptions = items.reduce<string[]>((arr, cur) => {
        if (cur.language && !arr.some(lang => lang.toLocaleLowerCase() === cur.language?.toLocaleLowerCase())) arr.push(cur.language);

        return arr
    }, [])

    const [filterLanguage, setLanguage] = useState("any");
    const [minStar, setMinStar] = useState("any");
    const [filterUpdate, setUpdate] = useState("any");
    const [sortData, setSort] = useState("any")

    return (

        <div className="repoSortPanel">
            <h3 className="repoSortPanel__title">Refine results</h3>

            <div className="repoSortPanel__group">
                <label className="repoSortPanel__group--title" htmlFor="language">LANGUAGE</label>

                <select 
                    className="repoSortPanel__group--select" 
                    id="language"
                    onChange={e => setLanguage(e.target.value)}>
                    <option value="any">Any language</option>   
                    {languageOptions.sort().map(el => (

                        <option key={el.toLowerCase()} value={el.toLowerCase()}>{el}</option>
                    ))}
                </select>

            </div>

            <hr className="repoSortPanel__line" />

            <fieldset className="repoSortPanel__group">
                <label className="repoSortPanel__group--title">MINIMUM STARS</label>

                <label className="repoSortPanel__group--item">
                <input 
                    type="radio" 
                    name="minStars" 
                    value="any" 
                    checked={minStar === "any"}
                    onChange={() => setMinStar("any")}/>
                Any
                </label>

                <label className="repoSortPanel__group--item">
                <input 
                    type="radio" 
                    name="minStars" 
                    value="100" 
                    onChange={() => setMinStar("100")}/>
                100+
                </label>

                <label className="repoSortPanel__group--item">
                <input 
                    type="radio" 
                    name="minStars" 
                    value="1000" 
                    onChange={() => setMinStar("1000")}/>
                1,000+
                </label>

                <label className="repoSortPanel__group--item">
                <input 
                    type="radio" 
                    name="minStars" 
                    value="10000" 
                    onChange={() => setMinStar("10000")}/>
                10,000+
                </label>

            </fieldset>

            <hr className="repoSortPanel__line" />

            <div className="repoSortPanel__group">
                <label className="repoSortPanel__group--title" htmlFor="updated">UPDATED</label>
                
                <select 
                    className="repoSortPanel__group--select" 
                    id="updated"
                    onChange={e => setUpdate(e.target.value)}>

                    <option className="repoSortPanel__group--item" value="any">Any time</option>
                    <option className="repoSortPanel__group--item" value="day">Today</option>
                    <option className="repoSortPanel__group--item" value="week">This week</option>
                    <option className="repoSortPanel__group--item" value="month">This month</option>
                    <option className="repoSortPanel__group--item" value="year">This year</option>

                </select>

            </div>
            <hr className="repoSortPanel__line" />

            <div className="repoSortPanel__group">
                <label className="repoSortPanel__group--title" htmlFor="sorted">SORT BY BEST</label>
                
                <select 
                    className="repoSortPanel__group--select" 
                    id="sorted"
                    onChange={e => setSort(e.target.value)}>
                    
                    <option className="repoSortPanel__group--item" value="any">Any items</option>
                    <option className="repoSortPanel__group--item" value="stargazers_count">Stars</option>
                    <option className="repoSortPanel__group--item" value="forks_count">Forks</option>
                    <option className="repoSortPanel__group--item" value="open_issues_count">Issues</option>

                </select>

            </div>
            <hr className="repoSortPanel__line" />

            <div className="repoSortPanel__btn--wrapper">
                <button 
                    className="repoSortPanel__btn"
                    onClick={() => (setPage(1), onSort({
                        language: "any",
                        minStars: "any",
                        updated: "any",
                        sortBy: "any",
                    }))}>
                    Reset
                </button>
                <button 
                    className="repoSortPanel__btn"
                    onClick={() => (setPage(1), onSort({
                        language: filterLanguage,
                        minStars: minStar,
                        updated: filterUpdate,
                        sortBy: sortData as keyof GitHubRepository | "any",
                    }))}>
                    To sort
                </button>
            </div>
        
        </div>
    )
}