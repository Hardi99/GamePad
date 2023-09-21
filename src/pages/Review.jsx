import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

//Assets
import logoTitle from '../assets/logo-title.png'

//Components
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Review = () => {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleText = (event) => {
        setText(event.target.value);
    }

    return (
        <div className='container'>
            <Header />
            <form action="">
                <label htmlFor="">Review Title</label>
                <input type="text" onChange={handleTitle} />
                
                <label htmlFor="">Review Text</label>
                <textarea name="" id="" cols="30" rows="10" onChange={handleText}></textarea>
            </form>
        </div>
    )
}

export default Review