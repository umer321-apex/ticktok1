// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import api from "../Services/api";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
 
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage(""); 
//     try {
//       const response = await api.post("/register", { username, password });
  

//       if (response.status === 201 && response.data.message) {
//         setMessage(response.data.message); 
//         navigate("/login"); 
//       } else {
       
//         setMessage("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Registration failed:", error);
  
      
//       if (error.response && error.response.data && error.response.data.error) {
//         setMessage(error.response.data.error);
//       } else {
//         setMessage("Registration failed. Please try again.");
//       }
//     }
//   };
  

//   return (
//     <form onSubmit={handleRegister} style={styles.form}>
//       <h2 style={styles.header}>Register</h2>
//       {message && <p style={{ color: "red" }}>{message}</p>}
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         style={styles.input}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         style={styles.input}
//         required
//       />
//       <button type="submit" style={styles.button}>Register</button>
//     </form>
//   );
// };

// const styles = {
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     maxWidth: "400px",
//     margin: "0 auto",
//     padding: "20px",
//     backgroundColor: "#f8f9fa",
//     borderRadius: "5px",
//     boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//   },
//   header: {
//     marginBottom: "15px",
//     textAlign: "center",
//   },
//   input: {
//     padding: "10px",
//     marginBottom: "10px",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//   },
//   button: {
//     padding: "10px",
//     backgroundColor: "#007bff",
//     border: "none",
//     color: "white",
//     cursor: "pointer",
//     borderRadius: "5px",
//   },
// };

// export default Register;





















// This is No 1 with simple code of ticktok

// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import api from "../Services/api";
// import { TextField, Button, Typography, Box, Container } from "@mui/material";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage(""); 
//     try {
//       const response = await api.post("/register", { username, password });

//       if (response.status === 201 && response.data.message) {
//         setMessage(response.data.message); 
//         navigate("/login"); 
//       } else {
//         setMessage("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Registration failed:", error);

//       if (error.response && error.response.data && error.response.data.error) {
//         setMessage(error.response.data.error);
//       } else {
//         setMessage("Registration failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box
//         component="form"
//         onSubmit={handleRegister}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: 2,
//           backgroundColor: "#fff",
//           borderRadius: 2,
//           boxShadow: 3,
//           mt:4
//         }}
//       >
//         <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
//           Register
//         </Typography>

//         {message && <Typography color="error" sx={{ marginBottom: 2 }}>{message}</Typography>}

//         <TextField
//           label="Username"
//           variant="outlined"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           fullWidth
//           sx={{ marginBottom: 2 }}
//         />

//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           fullWidth
//           sx={{ marginBottom: 2 }}
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{
//             padding: "10px",
//             backgroundColor: "#FE2C55",  // Razzmatazz color
//             "&:hover": {
//               backgroundColor: "#D91C4F",
//             },
//           }}
//         >
//           Register
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Register;





// This is the code with Variation of Password and email validation

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import api from "../services/api";

import { TextField, Button, Typography, Box, Container, FormHelperText } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    number: false,
    specialChar: false,
    capitalLetter: false,
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await api.post("/register", { username, email, password });

      if (response.status === 201 && response.data.message) {
        setMessage(response.data.message);
        navigate("/login");
      } else {
        setMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  // Password validation logic
  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const numberValid = /[0-9]/.test(password);
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const capitalLetterValid = /[A-Z]/.test(password);

    setPasswordRules({
      length: lengthValid,
      number: numberValid,
      specialChar: specialCharValid,
      capitalLetter: capitalLetterValid,
    });

    return lengthValid && numberValid && specialCharValid && capitalLetterValid;
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue) {
      const isValid = validatePassword(passwordValue);
      setPasswordError(!isValid);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  // Regex for email validation
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          mt: 4,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
          Register
        </Typography>

        {message && <Typography color="error" sx={{ marginBottom: 2 }}>{message}</Typography>}

        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          required
          fullWidth
          error={!isEmailValid && email.length > 0}
          helperText={!isEmailValid && email.length > 0 ? "Invalid email address" : ""}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          required
          fullWidth
          error={passwordError}
          helperText={passwordError ? "Password does not meet criteria" : ""}
          sx={{ marginBottom: 2 }}
        />

        {/* Password Rules */}
        {password && (
          <Box sx={{ marginBottom: 2, textAlign: "left", width: "100%" }}>
            <Typography variant="body2" color={passwordRules.length ? "green" : "red"}>
              - At least 8 characters
            </Typography>
            <Typography variant="body2" color={passwordRules.number ? "green" : "red"}>
              - At least 1 number
            </Typography>
            <Typography variant="body2" color={passwordRules.specialChar ? "green" : "red"}>
              - At least 1 special character
            </Typography>
            <Typography variant="body2" color={passwordRules.capitalLetter ? "green" : "red"}>
              - At least 1 capital letter
            </Typography>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isEmailValid || passwordError}
          sx={{
            padding: "10px",
            backgroundColor: "#FE2C55", // Razzmatazz color
            "&:hover": {
              backgroundColor: "#D91C4F",
            },
          }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
