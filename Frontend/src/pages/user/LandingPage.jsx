import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import { Coffee, LogIn, UserPlus } from 'lucide-react';  // Icons
import { motion } from 'framer-motion';  // Animation

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: 'url("https://restaurant-listing-platform.onrender.com/uploads/res3.avif")',  
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
              variant="h3"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', color: 'brown' }}
            >
              <Coffee size={36} style={{ marginRight: 10 }} />
              Welcome to Restaurant Listing Platform
            </Typography>
          </motion.div>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              mt: 4,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 120 }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'brown',
                  color: '#fff',
                  width: '100%',
                  maxWidth: '300px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #D2B48C, #FFF8E1)', // Softer gradient hover
                color: '#5C4033',
                  },
                }}
                onClick={() => navigate('/login')}
              >
                <LogIn size={20} />
                Login
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 120 }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'brown',
                  color: '#fff',
                  width: '100%',
                  maxWidth: '300px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #D2B48C, #FFF8E1)', // Softer gradient hover
                    color: '#5C4033',
                  },
                }}
                onClick={() => navigate('/register')}
              >
                <UserPlus size={20} />
                Register
              </Button>
            </motion.div>
          </Box>
        </Container>
      </motion.div>
    </Box>
  );
};

export default LandingPage;
