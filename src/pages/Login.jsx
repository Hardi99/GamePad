import { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from "react-router-dom";

//Assets
import logo from '../assets/logo.png'

//Components
import Header from '../components/Header';

const Login = ({handleToken, BookmarkBorderSharpIcon, CommentOutlinedIcon, PersonOutlineOutlinedIcon}) => {

    const [data, setData] = useState([])
    //Ce state gère la recherche par nom
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
      const handleSubmit = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/login`);
          setData(response.data);
          handleToken(response.data.token);
          navigate("/");
          console.log(data);
        } catch (error) {
          console.log(error.message);
          console.log(error.response);
        }
      };

      return (
        <div className='container'>
            <Header />
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