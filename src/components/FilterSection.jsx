import "../styles/FilterSection.css"

export default function FilterSection () {
    return (
      <section className="filter-section">
        <p className="filter-by-text">Filter by:</p>
        <select name="all-genres" className="all-genres">
          <option value="All Genres">All Genres</option>
          <option value="Genre 1">Genre 1</option>
          <option value="Genre 2">Genre 2</option>
          <option value="Genre 3">Genre 3</option>
          <option value="Genre 4">Genre 4</option>
        </select>
        <select name="recently-updated" className="recently-updated">
          <option value="Recently Updated">Recently Updated</option>
          <option value="Most Popular">Most Popular</option>
          <option value="Newest">Newest</option>
        </select>
      </section>
    )
}