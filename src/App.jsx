import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  const [sortOrder,setSortOrder] = useState("Newest");
  const [currentPage,setCurrentPage] = useState(1);

  useEffect(() => {

    //Fetch data from API
    fetch("https://podcast-api.netlify.app/shows")

      // If response is OK, parse from JSON into a JS object
      .then(response => {
        if (!response.ok) throw new Error("Data failed to be fetched");
        return response.json();
      })

      // Set podcast data to data fetched
      .then(data => {
        setPodcastData(data);
        console.log("Total shows fetched:", data.length);
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

  // Filter by title in search bar
  let filteredData = podcastData.filter(podcast => (
    podcast.title.toLowerCase().includes(searchLetters.toLowerCase())
  ));

  // Go back to page 1 when letters typed
  useEffect(() => {
    setCurrentPage(1)
  },[searchLetters]);

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
  
  // Podcasts displayed per page
  const podcastsPerPage = 12;
  
  // Copy of filtered list
  const processedData = [...filteredData];

  // How may pages we need
  const totalPages = Math.ceil(processedData.length / podcastsPerPage);

  // Reset page back to Page 1 after changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  },[totalPages,currentPage])

  // Get podcasts for current page
  const startIndex = (currentPage - 1) * podcastsPerPage;
  const endIndex = startIndex + podcastsPerPage;
  const paginatedData = processedData.slice(startIndex,endIndex);

  return (
    <>
      <Routes>
      
        <Header 
          searchLetters={searchLetters} 
          setSearchLetters={setSearchLetters}
        />

        <Route 
          path='/' 
          element={
            <Main 
              podcastData={paginatedData}

              searchLetters={searchLetters}

              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}

              currentPage={currentPage}
              setCurrentPage={setCurrentPage}

              podcastsPerPage={podcastsPerPage}
              totalPages={totalPages}
            />
          }
        >
        </Route>

        <Route
          path='/show/:id'
          element={<ShowDetail />}
        >
        </Route>

        {/* Show error if no data fetched */}
        {hasError && 
          <div className='error-container'>
            <p className='error-msg'>
              Data could not be fetched
            </p>
          </div>
        }

        {/* Show loading info */}
        {loading && 
          <div className='loading-container'>
            <div className='loading-circle'></div>
            <p className='loading-text'>Loading...</p>
          </div>
        }

        {/* Show no podcasts displayed */}
        {filteredData.length === 0 && !loading && (
            <div className="no-podcasts-container">
              <p className="no-podcasts-text">No podcasts found</p>
            </div>
        )}   
            
      </Routes>
    </>
  )
}