import "./Header.css"
import { NavLink } from "react-router-dom";

export function Header () {
    return (
        <div className="header">
            <div className="header__logo">
                <h3>RepoScope</h3>
            </div>
            <nav className="menu">
                <ul className="menu__list">
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? "menu__item menu__item--active" : "menu__item"}
                            to="/"
                        >
                            Explore
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? "menu__item menu__item--active" : "menu__item"}
                            to="/saved"
                        >
                            Saved
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}