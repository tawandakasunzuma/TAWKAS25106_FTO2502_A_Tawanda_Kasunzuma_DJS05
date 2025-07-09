import { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';

import "./styles/App.css"

export default function App() {

  const [podcastData,setPodcastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError,setHasError] = useState(false);

  useEffect(() => {

    //Fetch data from API
    fetch("https://podcast-api.netlify.app/")

      // If response is OK, parse from JSON into a JS object
      .then(response => {
        if (!response.ok) throw new Error("Data failed to be fetched");
        return response.json();
      })

      // Set podcast data to data fetched
      .then(data => {
        setPodcastData(data);
      })
  
      // Show error in console and on the UI
      .catch(error => {
        console.error("Error:", error);
        setHasError(error);
      })
  
      // Stop loading
      .finally(() => {
        setLoading(false)
      })
  },[])

  return (
    <>
      <Header />
      <Main podcastData={podcastData} />

      {hasError && 
        <div className='error-container'>
          <p className='error-msg'>
            Data could not be fetched
          </p>
        </div>
      }

      {loading && 
        <div className='loading-container'>
          <div className='loading-circle'></div>
        </div>
      }
    </>
  )
}