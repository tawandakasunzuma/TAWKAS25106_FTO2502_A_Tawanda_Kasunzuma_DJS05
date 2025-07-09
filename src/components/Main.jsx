import "../styles/Main.css"
import FilterSection from "./FilterSection"
import CardSection from "./CardSection"

export default function Main (props) {
    return (
        <main>
            <FilterSection 
                selectedGenre={props.selectedGenre} 
                setSelectedGenre={props.setSelectedGenre} 
                sortOrder={props.sortOrder} 
                setSortOrder={props.setSortOrder} 
            />

            <CardSection podcastData={props.podcastData} />
        </main>
    )
}