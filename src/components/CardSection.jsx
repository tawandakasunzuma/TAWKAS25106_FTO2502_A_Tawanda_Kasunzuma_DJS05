import "../styles/CardSection.css"
import Card from "./Card"

export default function CardSection ({podcastData}) {

    const cards = podcastData.map(podcast => (
        <Card key={podcast.id} podcastData={podcast} />
    ))

    return (
        <section className="card-section">
            {cards}
        </section>
    )
}