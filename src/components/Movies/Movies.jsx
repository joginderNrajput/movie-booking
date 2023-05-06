import { Box, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./MovieItem";
import Spinner from "../Spinner"; // Import your custom Spinner component

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data.movies);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#900C3F"}
        color="white"
        margin={"auto"}
        textAlign={"center"}
        className="rounded-xl"
      >
        All Movies
      </Typography>
      {loading ? (
        <Box
          width="100%"
          margin={"auto"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <Spinner />
          <div className="mt-[90px] font-bold">
            <Typography>Loading...</Typography>
          </div>
        </Box>
      ) : (
        <Box
          width="100%"
          margin={"auto"}
          marginTop={5}
          display={"flex"}
          justifyContent={"center"}
          flexWrap={"wrap"}
        >
          {movies.map((movie, index) => (
            <MovieItem
              key={index}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Movies;
