import React, { Fragment, useEffect, useState } from "react";
import {
  deleteBooking,
  getMovieDetails,
  getUserBooking,
  getUserDetails,
} from "../components/api-helpers/api-helpers";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DeleteForever } from "@mui/icons-material";
import { toast } from "react-hot-toast";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();
  const [movies, setMovies] = useState();
  useEffect(() => {
    getUserBooking()
      .then((res) => {
        setBookings(res.bookings);
        // Extract the movie IDs from the bookings
        const movieIds = res.bookings.map((booking) => booking.movie);
        // Fetch the movie details for each ID
        movieIds.forEach((id) => {
          getMovieDetails(id)
            .then((res) => {
              // Store the movie details in the state
              setMovies((prev) => ({ ...prev, [id]: res.movie }));
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => console.log(error));
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((error) => console.log(error));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((error) => console.log(error));
  }, []);

  console.log(bookings);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

      const bookingDelete = true; // Set bookingSuccess to true

    if (bookingDelete) {
      toast.error('Movie Deleted successfully!');
    } 
  };

  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {" "}
        {user && (
          <Box
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 10 }}
            />
            <Typography
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Name : {user.name}{" "}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email : {user.email}{" "}
            </Typography>
          </Box>
        )}
        {bookings && bookings.length > 0 && (
          <Box width={"70%"} display={"flex"} flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
            >
              Bookings
            </Typography>
            <Box
              margin={"auto"}
              display={"flex"}
              flexDirection={"column"}
              width={"80%"}
            >
              <List>
                {bookings.map((booking, index) => (
                  <ListItem
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                    key={index}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      {/* Movie : {booking.movie.title} */}
                      Movie : {booking.movie.title}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Seat Number : {booking.seatNumber}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Date : {new Date(booking.date).toDateString()}
                    </ListItemText>
                    <IconButton
                      onClick={() => handleDelete(booking._id)}
                      color="error"
                    >
                      <DeleteForever />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default UserProfile;
