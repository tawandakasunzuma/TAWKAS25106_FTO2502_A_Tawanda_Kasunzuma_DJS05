import { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';

import "./styles/App.css"

export default function App() {

  // State for fetch logic
  const [podcastData,setPodcastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError,setHasError] = useState(false);

  // State for search, filter, sort, page state
  const [searchLetters,setSearchLetters] = useState("");
  const [selectedGenre,setSelectedGenre] = useState("All Genres");
  const [sortOrder,setSortOrder] = useState("Default");
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

  // Filter by title in search bar
  let filteredData = podcastData.filter(podcast => (
    podcast.title.toLowerCase().includes(searchLetters.toLowerCase())
  ));

  // Filter by genre
  if (selectedGenre !== "All Genres") {
    const genreId = Number(selectedGenre);
    filteredData = filteredData.filter(podcast => (
      podcast.genres.includes(genreId)
    ))
  }

  // Sort in order
  filteredData.sort((a,b) => {
    if (sortOrder === "Newest") {
      return new Date (b.updated) - new Date(a.updated);
    } else if (sortOrder === "Oldest") {
      return new Date (a.updated) - new Date(b.updated);
    } else if (sortOrder === "TitleAsc") {
      return a.title.localeCompare(b.title);      
    } else if (sortOrder === "TitleDesc") {
      return b.title.localeCompare(a.title);
    }
  });

  // Go back to page 1 when letters typed
  useEffect(() => {
    setCurrentPage(1)
  },[searchLetters]);

  return (
    <>
      <Header 
        searchLetters={searchLetters} 
        setSearchLetters={setSearchLetters}
      />

      <Main 
        podcastData={filteredData}

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
          <p className='loading-text'>Loading...</p>
        </div>
      }
    </>
  )
}