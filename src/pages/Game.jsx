import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

//Assets
import { Icon } from '@mui/material';
import BookmarkBorderSharpIcon from '@mui/icons-material/BookmarkBorderSharp';

//Components
import Header from '../components/Header';

console.log(BookmarkBorderSharpIcon)

const Game = () => {

    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/games/${id}`);
          console.log(response.data);
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
        <div className='game-description'>
            <p>{data.name}</p>
            <div>
              <img src={data.background_image} alt="" />
              <aside>
                <p>Saved to Collection</p>
                <p>Add a review</p>
                <svg data-testid={BookmarkBorderSharpIcon}></svg>
              </aside>
            </div>
        </div>
      </div>
    )
}

export default Game