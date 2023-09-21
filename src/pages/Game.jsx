import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

//Components
import Header from '../components/Header';

const Game = ({token}) => {

    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/games/${id}`);
          //console.log(response.data);
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
          console.log(error.response);
        }
      };
      fetchData();
    }, [id]);

    return isLoading ? (
        <p>Loading ...</p>
    ) : (
      <div className='container'>
        <Header />
        <p>{data.name}</p>
        <div className='game-description'>
          <img src={data.background_image} alt="" />
          <nav>
            <div className='icon'><span>Save to Collection</span></div>
            <div className='icon'><span>Add a review</span></div>
          </nav>
        </div>
      </div>
    )
}

export default Game