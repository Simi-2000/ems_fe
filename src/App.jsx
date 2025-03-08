import React from 'react';
import StudentInfoBE from './components/StudentInfoBE';
import ViewBE from './components/ViewBE'; // Make sure this path is correct
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import Material-UI components
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';

const App = () => {
  return (
    <BrowserRouter>
      {/* Material UI AppBar for navigation header */}
      <AppBar position="sticky">
        <Toolbar sx={{ backgroundColor: '#e1bee7' }}> {/* Light Purple Background */}
          <Typography variant="h6" sx={{ fontFamily: 'Lora, serif', color: 'purple' }}>
            Student Information App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main content with full width and a gradient background */}
      <Container
        maxWidth={false}  // Set maxWidth to false for full-width layout
        style={{
          marginTop: '1px',
          padding: '20px',
          background: 'linear-gradient(to right, #e1bee7,rgb(196, 165, 255))', // Double shade gradient (Light Purple to Lighter Purple)
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
                <Button variant="contained" color="secondary" href="/" style={{ marginTop: '20px' }}>
                  Back to Student Information
                </Button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </>
              
            }
            
          />
        </Routes>
      </Container>
    </BrowserRouter>
    
  );
};

export default App;
