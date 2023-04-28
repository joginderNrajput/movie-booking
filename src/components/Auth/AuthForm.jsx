import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Password } from "@mui/icons-material";
import { Link } from "react-router-dom";

const AuthForm = ({ onSubmit, isAdmin }) => {
  const labelStyle = { mt: 1, mb: 1 };
  const [isSignUp, setIsSignUp] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputs", inputs);
    onSubmit({ inputs, signup: isAdmin ? false : isSignUp });
  };

  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ backgroundColor: "#2b2d42", borderRadius: "" }}>
        <Typography variant="h4" textAlign={"center"} sx={{ color: "#fff", padding : "4"}}>
          {isSignUp ? "Sign Up" : "Login"}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          padding={6}
          flexDirection={"column"}
          width={400}
          margin={"auto"}
          alignContent={"center"}
          sx={{ border: "1px solid #e0e0e0", borderRadius: "0 0 20px 20px" }}
        >
          {!isAdmin && isSignUp && (
            <>
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type={"text"}
                name="name"
              />
            </>
          )}
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"email"}
            name="email"
            sx={{ "& input": { color: "#3c3f4d" } }}
          />
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"password"}
            name="password"
            sx={{ "& input": { color: "#3c3f4d" } }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: 10,
              bgcolor: "#fca311",
              "&:hover": { bgcolor: "#fcbf49" },
            }}
            type="submit"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>

          {!isAdmin && (
            <Button
              onClick={() => setIsSignUp(!isSignUp)}
              sx={{
                mt: 2,
                borderRadius: 10,
                color: "blue",
                "&:hover": { bgcolor: "#e0e0e0" },
              }}
              fullWidth
            >
              Switch to
              {isSignUp ? " Login" : " SignUp"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
