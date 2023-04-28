import React, { useState, useEffect } from "react";
import { AppBar, Toolbar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import MovieIcon from "@mui/icons-material/Movie";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/system";
import { getAllMovies } from "./api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store/store";

const Header = () => {
  const navigate = useNavigate();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((error) => console.log(error));
  }, []);

  const logOut = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    if(isUserLoggedIn){
      navigate(`/booking/${movie._id}`);
    }
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <Link to="/">
            <MovieIcon />
          </Link>
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  input: { color: "white" },
                  "&.MuiAutocomplete-endAdornment": { color: "red" },
                }}
                variant="standard"
                {...params}
                placeholder="Search Across Movies"
              />
            )}
          />
        </Box>

        <Box className="flex">
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/movies" label="Movies" />
            {!isUserLoggedIn &&
              !isAdminLoggedIn && [
                <Tab key={1} LinkComponent={Link} to="/auth" label="Auth" />,
                <Tab key={2} LinkComponent={Link} to="/admin" label="Admin" />,
              ]}
            {isUserLoggedIn && [
              <Tab key={1} LinkComponent={Link} to="/user" label="Profile" />,
              <Tab
                key={2}
                onClick={() => logOut(false)}
                LinkComponent={Link}
                to="/"
                label="Logout"
              />,
            ]}
            {isAdminLoggedIn && [
              <Tab key={1} LinkComponent={Link} to="/add" label="Add Movie" />,
              <Tab
                key={2}
                LinkComponent={Link}
                to="/user-admin"
                label="Profile"
              />,
              <Tab
                key={3}
                onClick={() => logOut(true)}
                LinkComponent={Link}
                to="/"
                label="Logout"
              />,
            ]}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
