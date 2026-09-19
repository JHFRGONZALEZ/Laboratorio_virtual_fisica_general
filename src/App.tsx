import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import MRUPractice from './pages/MRUPractice';
import MRUVPractice from './pages/MRUVPractice';
import FreeFallPractice from './pages/FreeFallPractice';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practica/mru" element={<MRUPractice />} />
        <Route path="/practica/mruv" element={<MRUVPractice />} />
        <Route path="/practica/caida-libre" element={<FreeFallPractice />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
