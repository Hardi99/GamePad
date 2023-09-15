import '../App.css'
import { useNavigate } from "react-router-dom";

//Assets

import logoTitle from '../assets/logo-title.png'

const Header = ({}) => {

  const navigate = useNavigate(); // rappel

    return (
        <header>
          <img src={logoTitle} alt="" />
          <nav>
            <a href="">My Collection</a>
              <button onClick={() => {navigate('/login')}}>Login</button>
          </nav>
        </header>)
}

export default Header