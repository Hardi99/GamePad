import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

//Components
import Header from '../components/Header';

const Game = ({token}) => {

  const navigate = useNavigate(); // rappel

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
        <Header token={token} />
        <p>{data.name}</p>
        <div className='game-description'>
          <img src={data.background_image} alt="" />
          {token ? (
            <nav>
              <div className='icon'><span>Save to Collection</span></div>
              <div className='icon' onClick={()=>{navigate(`/add-a-review/${id}`)}}><span>Add a review</span></div>
            </nav>
          ) : null}
        </div>
      </div>
    )
}

export default Game