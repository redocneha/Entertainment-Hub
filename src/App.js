import React from 'react';
import './App.css';
import { Route,Routes } from "react-router";

import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav/MainNav';
import { Container } from '@material-ui/core';
import Trending from './pages/Trending/Trending';
import Movies from './pages/Movies/Movies';
import TVSeries from './pages/TVSeries/TVSeries';
import Search from './pages/Search/Search';

function App() {
  return (
    <BrowserRouter>
        <Header/>
    <div className="app">
        <Container>
            <Routes>
              <Route path="/" element={<Trending/>} exact />
              <Route path="/movies" element={<Movies/>} />
              <Route path="/tv-series" element={<TVSeries/>} />
              <Route path="/search" element={<Search/>}/>
            </Routes>
      </Container>
      </div>
      <SimpleBottomNavigation/>
      </BrowserRouter>
  );
}

export default App;
