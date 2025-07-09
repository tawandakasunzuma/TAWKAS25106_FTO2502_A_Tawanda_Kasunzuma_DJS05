import { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';

import "./styles/App.css"

export default function App() {

  // State for fetch logic
  const [podcastData,setPodcastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError,setHasError] = useState(false);

  // State for search, filter, sort, pagination
  const [searchLetters,setSearchLetters] = useState("");
  const [selectedGenre,setSelectedGenre] = useState("All-Genres");
  const [sortOrder,setSortOrder] = useState("date-desc");
  const [currentPage,setCurrentPage] = useState(1);

  // Podcasts displayed per page
  const podcastsPerPage = 12;

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
        setHasError(true);
      })
  
      // Stop loading
      .finally(() => {
        setLoading(false)
      })
  },[])

  // Check state updates when values change
  useEffect(() => {
    console.log({ searchLetters, selectedGenre, sortOrder, currentPage});
  }, [searchLetters, selectedGenre, sortOrder, currentPage]);

  return (
    <>
      <Header 
        searchLetters={searchLetters} 
        setSearchLetters={setSearchLetters}
      />

      <Main 
        podcastData={podcastData}

        searchLetters={searchLetters}

        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}

        currentPage={currentPage}
        setCurrentPage={setCurrentPage}

        podcastsPerPage={podcastsPerPage}
      />

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