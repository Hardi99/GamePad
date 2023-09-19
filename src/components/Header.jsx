import '../App.css'
import { useNavigate } from "react-router-dom";

//Assets

import logoTitle from '../assets/logo-title.png'

const Header = ({}) => {

  const navigate = useNavigate(); // rappel

    return (
        <header>
          <img onClick={() => {navigate('/')}} src={logoTitle} alt="" />
          <nav>
            <a href="/collection">My Collection</a>
              <button onClick={() => {navigate('/login')}}>Login</button>
          </nav>
        </header>)
}

export default Header