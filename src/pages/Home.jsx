import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

//Assets
import logoTitle from '../assets/logo-title.png'

//Components
import Header from '../components/Header';

const Home = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('')

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://api.rawg.io/api/games?key=ba3800086a4f43178d37e2df957e5a0d&page=1");
          setData(response.data.results);
          //console.log(data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
          console.log(error.response);
        }
      };
      fetchData();
    }, []);

    const results = []

    for (let i = 0; i < data.length; i++) {
        if(data[i].slug.includes(search) || data[i].name.includes(search)) {
            results.push(data[i])
        }
    }

    const handleSearch = (event) => {
      setSearch(event.target.value)
    }

    return isLoading ? (
        <p>Loading ...</p>
    ) : (
      <div className='container'>
        <Header />
        <div className='games-wrapper'>
          <img src={logoTitle} alt="" />
          <input type="text" onChange={handleSearch} />
          {search ? (
            <h2>Search results for {search}</h2>
          ) : null}
            <div className="games">
                {results.map((game, index) => {
                    return (
                        <div key={index}>
                            <img src={game.background_image} alt="" />
                            <p>{game.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
      </div>
    )
}

export default Home