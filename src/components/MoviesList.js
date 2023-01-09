import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = ({ movies }) => {
  const data = (
    <ul className={classes["movies-list"]}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );

  const renderList = movies.length > 0 ? data : <p>NO DATA</p>;

  return renderList;
};

export default MovieList;
