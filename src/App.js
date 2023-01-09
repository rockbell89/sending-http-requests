import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const API_URL = "https://swapi.dev/api/film/";
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = () => {
    setIsLoading(true);
    setError(null);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("잘못된 요청입니다");
        return res.json();
      })
      .then((res) => {
        const transformData = res.results.map((data) => {
          return {
            id: data.episode_id,
            title: data.title,
            releaseDate: data.release_date,
            openingText: data.opening_crawl,
          };
        });
        setMovies(transformData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? (
          <p>..LOADING..</p>
        ) : !error ? (
          <MoviesList movies={movies} />
        ) : (
          <p>에러 발생 {error}</p>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
