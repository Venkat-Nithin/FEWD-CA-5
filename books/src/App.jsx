import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BooksPage from './pages/Home';
import RegistrationForm from './pages/Registration';

function App() {
  return (
    <Routes>
        <Route exact path="/" element = {<BooksPage />}></Route>
        <Route path="/register" element = {<RegistrationForm />}></Route>
    </Routes>
  );
}

export default App;