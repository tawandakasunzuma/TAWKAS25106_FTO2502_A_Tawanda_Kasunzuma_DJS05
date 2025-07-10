import "../styles/FilterSection.css"
import genres from "../assets/genres"

export default function FilterSection ({selectedGenre,setSelectedGenre,sortOrder,setSortOrder}) {

  const genreList = genres.map(genre => (
    <option value={genre.id} key={genre.id}>{genre.title}</option>
  ));

  return (
    <section className="filter-section">

      <p className="filter-by-text">Filter by:</p>

      <select 
        name="all-genres" 
        className="all-genres" 
        value={selectedGenre || "All Genres"}
        onChange={event => setSelectedGenre(event.target.value)}
      >

        <option value="All Genres">All Genres</option>
        {genreList}
      
      </select>
      
      <select 
        name="recently-updated" 
        className="recently-updated"
        value={sortOrder}
        onChange={event => setSortOrder(event.target.value)}
      >

        <option value="Newest">Recently Updated (Newest)</option>
        <option value="Oldest">Last Updated (Oldest)</option>
        <option value="TitleAsc">Title (A-Z)</option>
        <option value="TitleDesc">Title (Z -A)</option>
      
      </select>
    
    </section>
  )
}