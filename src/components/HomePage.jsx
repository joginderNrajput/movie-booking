import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "./api-helpers/api-helpers";
import Spinner from "./Spinner";

const HomePage = () => {
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/846a9086-8a40-43e0-aa10-2fc7d6d73730/dfj83zf-1c2fcc22-915e-41d0-a9b8-4cb1d7bbeff9.jpg/v1/fill/w_1280,h_480,q_75,strp/avatar__the_way_of_water__2022__banner_textess__10_by_mintmovi3_dfj83zf-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDgwIiwicGF0aCI6IlwvZlwvODQ2YTkwODYtOGE0MC00M2UwLWFhMTAtMmZjN2Q2ZDczNzMwXC9kZmo4M3pmLTFjMmZjYzIyLTkxNWUtNDFkMC1hOWI4LTRjYjFkN2JiZWZmOS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.b2kLuI5udAu31AFtSxKkm2ZEffxH_eErJOpFPrqoG80",
    "https://viewsonnewsonline.com/wp-content/uploads/2023/01/Pathaan.jpg",
    "https://dyn1.heritagestatic.com/lf?set=path%5B1%2F0%2F5%2F9%2F1%2F10591649%5D%2Csizedata%5B850x600%5D&call=url%5Bfile%3Aproduct.chain%5D",
    "https://img01.products.bt.co.uk/content/dam/bt/portal/images/articles/tv/TV%20Film%20Captian%20Marvel%20Brie%20Larson%20hero.jpg",
    "https://cityspideynews.s3.amazonaws.com/uploads/spidey/202209/brahmastra-(2)-1663229520.webp",
    "https://www.hindustantimes.com/ht-img/img/2023/03/30/550x309/Adipurush__1680145315496_1680145326338_1680145326338.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, currentIndex]);

  return (
    <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
      <Box margin={"auto"} width={"80%"} height={"40vh"} padding={2}>
        <img
          src={images[currentIndex]}
          alt="Adipurush"
          className="w-full h-full object-top"
        />
      </Box>
      <Box
        sx={{
          padding: 3,
          margin: "auto",
          marginBottom: "20px",
          marginTop: " 20px",
          width: "50vw",
          backgroundColor: "#191970",
          borderRadius: "10px",
          color: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Typography variant="h4" align="center">
          Latest Release
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        margin={"auto"}
        width={"80%"}
        flexWrap={"wrap"}
      >
        {loading ? (
          <div className="mt-16 mb-16">
            <Spinner />
          </div>
        ) : movies.length > 0 ? (
          movies
            .slice(0, 6)
            .map((movie, index) => (
              <MovieItem
                key={index}
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
              />
            ))
        ) : (
          <Typography variant="subtitle1">No movies found.</Typography>
        )}
      </Box>
      <Box display="flex" justify="center" py={5}>
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{
            margin: "auto",
            color: "#2b2d42",
            border: "1px solid #2b2d42",
            borderRadius: "9999px",
            padding: "10px 20px",
            transition: "all .3s ease-in-out",
            "&:hover": {
              backgroundColor: "#2b2d42",
              color: "#fff",
            },
          }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
