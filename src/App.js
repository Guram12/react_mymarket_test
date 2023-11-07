import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Category from './Category';
import Login from './Login';
import Items from './Items';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
