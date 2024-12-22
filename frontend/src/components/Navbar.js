// import React, { useContext } from "react";
// import { Link,useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);

//   const navigate = useNavigate();
//   const handleLogout = () => {
//     logout();
//     navigate("/login"); // Redirect to login page after logout
//   };
//   return (
//     <nav style={styles.navbar}>
//       <Link to="/" style={styles.link}>Home</Link>
//       {user ? (
//         <>

//           <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
//         </>
//       ) : (
//         <>
//           <Link to="/login" style={styles.link}>Login</Link>
//           <Link to="/register" style={styles.link}>Register</Link>
//         </>
//       )}
//     </nav>
//   );
// };

// const styles = {
//   navbar: {
//     backgroundColor: "#007bff",
//     padding: "10px",
//     color: "white",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   link: {
//     color: "white",
//     textDecoration: "none",
//     padding: "0 10px",
//   },
//   user: {
//     marginRight: "10px",
//   },
//   logoutButton: {
//     padding: "5px 10px",
//     backgroundColor: "#ff6347",
//     border: "none",
//     color: "white",
//     cursor: "pointer",
//   },
// };

// export default Navbar;


import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, IconButton } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import ticktok from '../assets/ticktokbg.png'
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "0 20px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", height: 64 }}>
        <IconButton edge="start" component={Link} to="/">
          <img
            src={ticktok}
            alt="TikTok"
            style={{ height: "100px"}}
          />
        </IconButton>
        <Box sx={{ display: "flex", gap: 2 }}>
          {user ? (
            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: "#FE2C55",
                color: "#fff",
                '&:hover': { backgroundColor: "#e0224b" },
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  border: `2px solid white`,
                  color: "white",
                  '&:hover': {
                    backgroundColor: "rgba(37, 244, 238, 0.1)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{
                  backgroundColor: "#FE2C55",
                  color: "#fff",
                  '&:hover': { backgroundColor: "#e0224b" },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
