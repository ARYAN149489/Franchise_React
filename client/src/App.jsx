import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ApplyPage from './pages/ApplyPage';

function HomePage() {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Franchise Management Portal</h1>
      <div className="space-x-4">
        <Link to="/apply" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700">
          Apply for Franchise
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apply" element={<ApplyPage />} />
      </Routes>
    </Router>
  );
}

export default App;