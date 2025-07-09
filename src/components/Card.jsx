import "../styles/Card.css";
import seasonsIcon from '../assets/images/seasons-icon.svg';
import genreList from "../assets/genres";

export default function Card ({podcastData}) {

    /**
     * Makes genre tags using genre ID numbers.
     *
     * @param {number[]} genreIds - A list of genre IDs
     * @returns {JSX.Element[]} A list of <span> elements with genre names
     */
    function createGenreTags(genreIds) {
        return genreIds.map(id => {
            const genre = genreList.find(genre => genre.id === id);
            if (!genre) return null;
            return (
                <span key={id} className="genre-name">
                    {genre.title}
                </span>
            );
        });
    }
    const genreTags = createGenreTags(podcastData.genres);

    /**
     * Turns a date string into a human-readable format.
     *
     * @param {Object} data - The object that has the date.
     * @param {string} data.updated - The date string (ISO format).
     * @returns {string} A readable date string.
     */
    function getDate (data) {
        const date = new Date (data.updated);
        const day = String(date.getDate()).padStart(2, "0"); // Get day of month
        const month = date.toLocaleString("en", { month: "long" }); // Get the full month
        const year = date.getFullYear(); // Get full year
        const fullDate = `${day} ${month} ${year}`;
        return fullDate;
    }
    const formattedDate = getDate(podcastData);

    return (
        <article className="podcast-container">
            <div className="image-container">
                <img className="podcast-image" src={podcastData.image} alt={`${podcastData.title} cover image`} loading="lazy" />
                <p className="podcast-cover-title">{podcastData.title}</p>
            </div>
            <h3 className="podcast-title">{podcastData.title}</h3>
            <div className="seasons-section">
                <img className="seasons-icon" src={seasonsIcon} alt="Seasons icon" />
                <p className="num-seasons">{`${podcastData.seasons} seasons`}</p>
            </div>
            <div className="genre-section">
                {genreTags}
            </div>
            <p className="updated-status">
                {formattedDate}
            </p>
        </article>
    )
}