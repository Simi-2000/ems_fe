import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import StudentInfoBE from './components/StudentInfoBE';
import ViewBE from './components/ViewBE';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';

// Create simple components for Home, About, and Contact

const About = () => (
  <div>
    <h2>About Page</h2>
    <p>This app helps manage student information. It is built with React and Material-UI.</p>
  </div>
);

const Contact = () => (
  <div>
    <h2>Contact Page</h2>
    <p>If you have any questions, please contact us at contact@school.com.</p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      {/* Material UI AppBar with navigation buttons */}
      <AppBar position="sticky">
        <Toolbar sx={{ backgroundColor: '#81c784' }}>
          <Button variant="h6" sx={{ fontFamily: 'Lora, serif', color: 'purple' }} href="/">
            Student Information App
          </Button>
          <Box sx={{ marginLeft: 'auto' }}>
            <Button color="inherit" component={Link} to="/" sx={{ color: 'purple' }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about" sx={{ color: 'purple' }}>
              About
            </Button>
            <Button color="inherit" component={Link} to="/contact" sx={{ color: 'purple' }}>
              Contact
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Main content with full width and a gradient background */}
      <Container
        maxWidth={false}  // Set maxWidth to false for full-width layout
        style={{
          minHeight: "92vh",
          marginTop: '1px',
          padding: '20px',
          background: 'linear-gradient(to right,rgb(86, 139, 98),rgb(224, 246, 199))', // Double shade gradient (Light Purple to Lighter Purple)
          borderRadius: '8px', // Optional: gives the container rounded corners
          width: '100%', // Ensures the container takes up full width
        }}
      >
        <Routes>
          {/* StudentInfoBE route */}
          <Route
            path="/"
            element={
              <>
                <StudentInfoBE />

              </>
            }
          />
          {/* ViewBE route */}
          <Route
            path="/v"
            element={
              <>
                <ViewBE />
              </>

            }

          />
        </Routes>
      </Container>
    </BrowserRouter>

  );
};

export default App;
