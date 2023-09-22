import { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

//Assets
import logo from '../assets/logo.png'

//Components
import Header from '../components/Header';

const Login = ({handleToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false)

    // state qui stock l'error et me permet de facilement l'afficher en dessous de mon form lors d'un problème
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      setErrorMessage("");
      try {
              // remplacez l'url suivante avec l'url de votre back déployé
              const response = await axios.post("http://localhost:3000/login", {
                  email,
                  password,
              });
              console.log(response.data);
              handleToken(response.data.token);
              //setUsername(response.data.username)
              setIsLogin(!isLogin);
              navigate('/');
      } catch (error) {
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
      }
    };

      return (
        <div className='container'>
            <Header handleToken={handleToken} />
            <div className='contact-form'>
                <main>
                    <div>
                        <img src={logo} alt="" />
                        <h2>How it works ?</h2>
                        <p>Log in to your free account to be able to get all features of Gamepad</p>
                        <p>Add a game to your collection</p>
                        <p>Leave a review for a game</p>
                    </div>
                    <div>
                        <h2>Login</h2>
                        <form className='form-login' onSubmit={handleSubmit}>
                            <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={email}
                            // deuxième syntaxe possible
                            onChange={(event) => {
                                const value = event.target.value;
                                setEmail(value);
                            }}
                            />
                            <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(event) => {
                                const value = event.target.value;
                                setPassword(value);
                            }}
                            />
                            <button>Connexion</button>
                            <Link to="/signup">Don' t have an account yet ? Click here</Link>
                        </form>
                        {/* Si errorMessage existe, alors j'affiche cette div ! */}
                        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}                        
                    </div>

                </main>            
            </div>
        </div>

      );
}

export default Login