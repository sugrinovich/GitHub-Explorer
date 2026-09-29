import "./Header.css"

export function Header () {
    return (
        <div className="header">
            <div className="header__logo">
                <h3>RepoScope</h3>
            </div>
            <nav className="menu">
                <ul className="menu__list">
                    <li className="menu__item menu__item--active">Explore</li>
                    <li className="menu__item">Saved</li>
                </ul>
            </nav>
        </div>
    )
}