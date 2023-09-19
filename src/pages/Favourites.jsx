import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

//Assets
import logoTitle from '../assets/logo-title.png'

//Components
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Favourites = () => {

    return isLoading ? (
        <p>Loading ...</p>
    ) : (
      <div className='container'>
        <Header />

      </div>
    )
}

export default Favourites