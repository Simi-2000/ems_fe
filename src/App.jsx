import React from 'react';
import StudentInfoBE from './components/StudentInfoBE';
import ViewBE from './components/ViewBE'; // Update the path to the components folder
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentInfoBE />} />
        <Route path="/v" element={<ViewBE />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
