// import React, { useState } from "react";
// import { TextField, Button, Container, Typography, Box } from "@mui/material";
// import { userLogin } from "../../services/userServices";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [userData, setUserData] = useState(null);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await userLogin(formData)
//       setMessage(response.data.message);
//       setUserData(response.data.user);
//       navigate("/home",{state:{user:response.data.user}});

//     } catch (error) {
//       setMessage(
//         error.response?.data?.error || "Login failed. Please try again."
//       );
//     }
//   };

//   return (
//     <Container maxWidth="sm" style={{ marginTop: "50px" }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Login
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Password"
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           Login
//         </Button>
//       </Box>
//       {message && (
//         <Typography color="primary" align="center" sx={{ mt: 2 }}>
//           {message}
//         </Typography>
//       )}
//       {userData && (
//         <Typography color="secondary" align="center" sx={{ mt: 2 }}>
//           Welcome, {userData.username}!
//         </Typography>
//       )}
//     </Container>
//   );
// };

// export default Login;



import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { userLogin } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(formData);
      setMessage(response.data.message);
      setUserData(response.data.user);
      navigate("/home", { state: { user: response.data.user } });
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Login failed. Please try again."
      );
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: 'url("http://localhost:5000/uploads/res4.avif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "rgba(255, 248, 240, 0.95)",
            padding: 4,
            borderRadius: 3,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#5C4033" }}
            >
              <LogIn size={36} style={{ marginRight: 10 }} />
              Login to Your Account
            </Typography>
          </motion.div>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  background: "linear-gradient(135deg, #D2B48C, #FFF8E1)",
                  color: "#5C4033",
                  fontWeight: "bold",
                  padding: "12px 0",
                  "&:hover": {
                    background: "#B99470",
                  },
                }}
              >
                <LogIn size={20} style={{ marginRight: 8 }} />
                Login
              </Button>
            </motion.div>
          </Box>

          {message && (
            <Typography color="primary" align="center" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}

          {userData && (
            <Typography color="secondary" align="center" sx={{ mt: 2 }}>
              Welcome, {userData.username}!
            </Typography>
          )}
        </Container>
      </motion.div>
    </Box>
  );
};

export default Login;
