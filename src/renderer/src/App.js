import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FolderPage from './pages/FolderPage';
import ConnectionPage from './pages/ConnectionPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/folder/:id" element={<FolderPage />} />
        <Route path="/connection/:id" element={<ConnectionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
