import "../styles/Main.css"
import FilterSection from "./FilterSection"
import CardSection from "./CardSection"

export default function Main ({podcastData}) {
    return (
        <main>
            <FilterSection />
            <CardSection podcastData={podcastData} />
        </main>
    )
}