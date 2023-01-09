import React, { useState, useCallback, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  // const API_URL = "https://swapi.dev/api/film/";
  const API_URL =
    "https://react-http-d7df6-default-rtdb.firebaseio.com/movies.json";
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("잘못된 요청입니다");
        return res.json();
      })
      .then((movie) => {
        console.log(movie);
        const loadedData = [];
        for (const key in movie) {
          loadedData.push({
            id: key,
            // title: movie[key].title,
            // releaseDate: movie[key].releaseDate,
            // openingText: movie[key].openingText,
            ...movie[key],
          });
        }

        setMovies(loadedData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const addMovieHandler = (movie) => {
    console.log(addMovieHandler);
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("잘못된 요청입니다");
        return res.json();
      })
      .then((res) => {
        fetchMovies();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
