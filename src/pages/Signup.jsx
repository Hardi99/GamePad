import { useState } from 'react';
import '../App.css';
import axios from 'axios';

//Assets
import logo from '../assets/logo.png'

//Components
import Header from '../components/Header';

const Signup = () => {

    const [data, setData] = useState([])
    //Ce state gère la recherche par nom
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [avatarUser, setAvatarUser] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [register, setRegister] = useState(false)

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
                        <form className='form-login'
                            onSubmit={async e => {
                                // Empêche le rafraichissement de page à la soumission du formulaire
                                e.preventDefault();

                                // Dans ce cas précis de formulaire, nous allons envoyer importer un file. Par conséquent il st obligatoire d'utiliser un formData (sans lui, nous ne pourrons pas envoyer d'image)
                                const formData = new FormData();
                                formData.append('username', username);
                                formData.append('email', email);
                                formData.append('password', password);
                                formData.append('checkPassword', checkPassword);
                                formData.append('avatar_user', avatarUser);

                                try {
                                    //Changement des arguments du axios.post
                                    if (password === checkPassword) {
                                        const response = await axios.post(
                                            "http://localhost:3000/signup",

                                            formData,

                                            // Dans un signup, il n'y a pas de token donc pas besoin d'envoyer le headers en 3ème argument
                                            /* {headers : {
                                                Authorization: "Bearer " + token,
                                                "Content-Type": 'multipart/form-data'
                                            }} */
                                        );
                                        console.log(response)
                                        setRegister(!register);
                                        setData(response.data.results);
                                        //console.log(data);
                                        //console.log(register);
                                        //Le stringify convertit le format JSON en string
                                        console.log(JSON.stringify(response.data))
                                        } else {
                                            setErrorMessage('Vos 2 mots de passe ne sont pas identiques !');
                                        }
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
                            onChange={(event) => {
                                setAvatarUser(event.target.files[0])
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