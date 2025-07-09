import "../styles/Header.css"
import accountCircle from '../assets/images/account-circle-icon.svg'
import searchIcon from "../assets/images/search-icon.svg"
import podcastIcon from "../assets/images/podcast-icon.svg"

export default function Header () {
    return (
        <header>
            <div className="header-left">
                <img className="icon-1" src={podcastIcon} alt="Podcast icon" />
                <h1 className="app-name">Podcast App</h1>
            </div>
            <div className="header-right">
                <img
                    className="search-icon icon-2"
                    src={searchIcon}
                    alt="Search icon"
                />
                <img
                    className="icon-3"
                    src={accountCircle}
                    alt="Profile picture"
                />
            </div>
        </header>
    )
}