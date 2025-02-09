// // src/pages/Register.jsx
// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import { userRegister } from '../../services/userServices';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await userRegister(formData)
//       console.log('Response:', response.data);
//       setMessage('Registration successful!');
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } catch (error) {
//       setMessage('Registration failed. Please try again.');
//     }
//   };



//   return (
//     <Container maxWidth="sm" style={{ marginTop: '50px' }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Register
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Username"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//         />
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
//         <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//           Register
//         </Button>
//       </Box>
//       {message && <Typography color="error" align="center" sx={{ mt: 2 }}>{message}</Typography>}
//     </Container>
//   );
// };

// export default Register;




import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';
import { userRegister } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('error');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email.includes('@')) errors.email = 'Invalid email address';
    if (formData.password.length < 6)
      errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await userRegister(formData);
      setMessage('Registration successful!');
      setMessageColor('green');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      setMessageColor('error');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: 'url("http://localhost:5000/uploads/res6.avif")',  // Update with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
            backgroundColor: 'rgba(255, 248, 240, 0.95)',
            padding: 4,
            borderRadius: 3,
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#5C4033' }}
            >
              <UserPlus size={36} style={{ marginRight: 10 }} />
              Register
            </Typography>
          </motion.div>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UserPlus />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
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
              error={!!errors.password}
              helperText={errors.password}
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
              transition={{ type: 'spring', stiffness: 120 }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  background: 'linear-gradient(135deg, #D2B48C, #FFF8E1)',
                  color: '#5C4033',
                  fontWeight: 'bold',
                  padding: '12px 0',
                  '&:hover': {
                    background: '#B99470',
                  },
                }}
              >
                Register
              </Button>
            </motion.div>
          </Box>

          {message && (
            <Typography
              align="center"
              sx={{ mt: 2 }}
              color={messageColor}
            >
              {message}
            </Typography>
          )}
        </Container>
      </motion.div>
    </Box>
  );
};

export default Register;
