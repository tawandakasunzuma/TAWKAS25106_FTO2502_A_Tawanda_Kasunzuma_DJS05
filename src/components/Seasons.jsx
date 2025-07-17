import '../styles/Seasons.css'
import learnMoreIcon from '../assets/images/learn-more-icon.svg'
import { useState } from 'react'

export default function Seasons ({seasons}) {
    
    console.log(seasons)
    
    const [openSeason,setOpenSeason] = useState({})

    function toggleSeason (index) {
        setOpenSeason(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const seasonsList = seasons.map((season,index) => (
        <div key={index}>
            <div 
                className="seasons-container"
            >
                <h4 className="season-title">
                    Season {index + 1}
                    {season.title !== null && !season.title.toLowerCase().includes("season")
                        ? ` - ${season.title}`
                        : ""
                    }
                </h4>
                <div className='right-side-season'>
                    <span className="season-length">
                        {season.episodes?.length || 0} Episodes
                    </span>
                    <img 
                        className='learn-more-icon' 
                        src={learnMoreIcon} 
                        alt="Learn more icon" 
                        onClick={() => toggleSeason(index)}
                        />
                </div>
            </div>
            {openSeason[index] && (
                <div className='episode-list'>
                    {season.episodes.map((episode,index) => (
                        <div key={index} className='episode-item'>
                            <div className='top-episode'>
                                <h5 className='episode-title'>Episode {episode.episode} - {episode.title}</h5>
                                <p className='episode-description'>{(episode.description?.slice(0, 200) + "...") || "No description available..."}</p>
                            </div>
                            <div className='bottom-episode'>
                                <img
                                    className='episode-image' 
                                    src={season.image} 
                                    alt={`Episode ${episode.title} cover`}
                                    loading='lazy'
                                />                                
                            </div>
                        </div>
                    ))}
            </div>)}
        </div>
    ))
    return (
        <>
            {seasonsList}
        </>
    )
}