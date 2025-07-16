import { useParams } from "react-router-dom"

export default function ShowDetail () {
    const { id } = useParams();
    return (
        <>
            {/* Show details of podcast clicked */}
            <h1>Podcast Detail Page for ID: {id}</h1>
        </>
    )
}