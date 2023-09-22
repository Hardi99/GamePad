import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import ReactPaginate from "react-paginate";

//Assets
import logoTitle from '../assets/logo-title.png'

//Components
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Home = ({username, token, handleToken}) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    //Ce state gère la recherche par nom
    const [search, setSearch] = useState('');
    //Les states suivants gèrent la pagination
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();

    let pageSize = 40

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/games?search=${search}&page=${page}&pageSize=${pageSize}`);
          setCount(response.data.count)
          setData(response.data.results);
          //console.log(count);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
          console.log(error.response);
        }
      };
      fetchData();
    }, [search, page, pageSize]);

    const handleSearch = (event) => {
      setSearch(event.target.value)
    }

    const handlePageClick = () => {
      setPage(page + 1);
      console.log(page)
    }

    return isLoading ? (
        <p>Loading ...</p>
    ) : (
      <div className='container'>
        <Header username={username} token={token} handleToken={handleToken} />
        <div className='games-wrapper'>
          <img src={logoTitle} alt="" />
          <div>
            <input type="text" placeholder='Search for a game...' onChange={handleSearch} />
          </div>
          {search ? (
            <p>Search results for {search}</p>
          ) : <p>Search {count} games</p>}
            <div className="games">
                {data.map((game, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/games/${game.id}`}>
                              <img src={game.background_image} alt="" />
                              <p>{game.name}</p>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              marginPagesDisplayed={1}
              pageRangeDisplayed={5}
              pageCount={Math.ceil(count / pageSize)}
              previousLabel="<"
              renderOnZeroPageCount={null}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
        </div>
      </div>
    )
}

export default Home