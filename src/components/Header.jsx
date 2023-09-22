import '../App.css'
import { useNavigate, Link } from "react-router-dom";

//Assets

import logoTitle from '../assets/logo-title.png'

const Header = ({token, username, handleToken}) => {

  const navigate = useNavigate(); // rappel

    return (
        <header>
          <img onClick={() => {navigate('/')}} src={logoTitle} alt="" />
              {token ? (
                <nav>
                  <a href="/collection">My Collection</a>
                  <p>{username}</p>
                  <button
                    onClick={() => {
                      handleToken(null);
                    }}
                  >
                    Déconnexion
                  </button>
                </nav>
              ) : (
                <button onClick={() => {navigate('/login')}}>Login</button>
              )}
        </header>)
}

export default Header