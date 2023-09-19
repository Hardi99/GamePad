import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

//Assets
import logo from '../assets/logo.png'

//Components
import Header from '../components/Header';

const Signup = ({handleToken}) => {

    const [data, setData] = useState([])
    //Ce state gère la recherche par nom
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [photo, setPhoto] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [register, setRegister] = useState(false)
    
      const handleSubmit = async () => {
        try {
            // Vérifier que les 2 password sont identiques
            if (password === checkPassword) {
                const response = await axios.get(`http://localhost:3000/signup`, {
                    username: username,
                    email: email,
                    password: password,
                    checkPassword: checkPassword,
                    photo: photo
            });
            setRegister(!register);
            setData(response.data.results);
            //console.log(data);
            //console.log(register);
            } else {
                setErrorMessage('Vos 2 mots de passe ne sont pas identiques !');
            }
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
                        <h2>Signup</h2>
                        <form
                            onSubmit={async e => {
                                // Empêche le rafraichissement de page à la soumission du formulaire
                                e.preventDefault();
                                console.log(token)

                                // Dans ce cas précis de formulaire, nous allons envoyer importer un file. Par conséquent il st obligatoire d'utiliser un formData (sans lui, nous ne pourrons pas envoyer d'image)
                                const formData = new FormData();
                                formData.append('username', username);
                                formData.append('email', email);
                                formData.append('password', password);
                                formData.append('checkPassword', checkPassword);
                                formData.append('photo', photo);

                                try {
                                    //Changement des arguments du axios.post
                                    const response = await axios.post(
                                        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",

                                        formData,

                                        // L'objet headers sert à s'authentifier auprès du serverur à l'aide du Bearer token
                                        {headers : {
                                            Authorization: "Bearer " + token,
                                            "Content-Type": 'multipart/form-data'
                                        }}
                                    );
                                    //Le stringify convertit le format JSON en string
                                    console.log(JSON.stringify(response.data))
                                } catch (err) {
                                    console.log(err)
                                    if (err.response.status === 500) {
                                        console.error("An error occured");
                                    } else {
                                        console.log(err.response.data)
                                        console.error(err.response.data.msgs)
                                    }
                                }
                            }}>
                            <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            // deuxième syntaxe possible
                            onChange={(event) => {
                                const value = event.target.value;
                                setUsername(value);
                            }}
                            />
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
                            <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password"
                            value={checkPassword}
                            onChange={(event) => {
                                const value = event.target.value;
                                setCheckPassword(value);
                            }}
                            />
                            <input
                            type='file'
                            placeholder="Add a Photo"
                            name="photo"
                            value={photo}
                            onChange={(event) => {
                                setPhoto(event.target.files[0])
                                console.log(event.target.files[0])
                            }}
                            />
                            <input type="submit" />
                        </form>
                        {/* Si errorMessage existe, alors j'affiche cette div ! */}
                        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}                        
                    </div>

                </main>            
            </div>
        </div>

      );
}

export default Signup