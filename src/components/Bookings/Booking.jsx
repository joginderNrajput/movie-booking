import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../api-helpers/api-helpers";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import { toast } from "react-hot-toast";

const Booking = () => {
  const [movie, setMovie] = useState();
  const id = useParams().id;
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  console.log(id);
  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((error) => console.log(error));
  }, [id]);
  console.log(movie);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    const bookingSuccess = true; // Set bookingSuccess to true

    if (bookingSuccess) {
      toast.success("Movie successfully booked!");
    } else {
      toast.error("Failed to book the movie.");
    }
  };
  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily={"fantasy"}
            variant="h4"
            textAlign={"center"}
            className="text-3xl font-bold text-center mb-8"
          >
            Book Tickets of Movie : {movie.title}
          </Typography>

          <Box display={"flex"} justifyContent={"center"}>
            <Box
              className="m-5"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              paddingTop={3}
              width="50"
              marginRight="auto"
            >
              <img
                className="rounded-lg shadow-md"
                width="80%"
                height="300px"
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width="80%" marginTop={3} padding={2}>
                <Typography
                  className="text-lg font-semibold italic text-gray-800"
                  paddingTop={2}
                >
                  {movie.description}
                </Typography>
                <Typography
                  className="text-md font-medium text-gray-600"
                  fontWeight="bold"
                  marginTop={1}
                >
                  Starrer:
                  {movie.actors.map((actor) => " " + actor + ", ")}
                </Typography>
                <Typography
                  className="text-md font-medium text-gray-600"
                  fontWeight="bold"
                  marginTop={1}
                >
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>

            <Box className="w-1/2 pt-3 mr-10 ml-0 mt-9">
              <form
                onSubmit={handleSubmit}
                className="p-5 mx-auto flex flex-col "
              >
                <FormLabel className="mb-1">Seat Number</FormLabel>
                <TextField
                  value={inputs.seatNumber}
                  onChange={handleChange}
                  name="seatNumber"
                  type={"number"}
                  className="border-none rounded-lg py-2 px-3 mb-3 "
                ></TextField>
                <FormLabel className="mb-1">Booking Date</FormLabel>
                <TextField
                  value={inputs.date}
                  onChange={handleChange}
                  name="date"
                  type={"date"}
                  className="border-none rounded-lg py-2 px-3 mb-3"
                ></TextField>
                <Button
                  type="submit"
                  sx={{
                    mt: 3,
                    backgroundColor: "#ffa500",
                    "&:hover": { backgroundColor: "#191970" },
                  }}
                  variant="contained"
                  color="primary"
                >
                  Book Now
                </Button>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
