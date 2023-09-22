import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from 'react';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Game from './pages/Game';
import Collection from './pages/Collection';
import Review from './pages/Review';

function App() {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Je je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username") || null);

  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  // Cette fonction permet de stocker le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleProfileName = (username) => {
    if (username) {
      Cookies.set("username", username, { expires: 15 });
      setUsername(username);
    } else {
      Cookies.remove("username");
      setUsername(null);
    }
  };

  return (
    <Router>
    {/* Je peux passer des props à mes composants */}
      <Routes>
        <Route path='/' element={<Home token={token} handleToken={handleToken} username={username} />} />
        <Route path='/games/:id' element={<Game token={token} />} />
        <Route path='/login' element={<Login token={token} handleToken={handleToken} />} />
        <Route path='/signup' element={<Signup handleToken={handleToken} />} />
        <Route path='/collection' element={<Collection token={token} handleToken={handleToken} />} />
        <Route path='/add-a-review/:id' element={<Review token={token} handleToken={handleToken} />}/>
      </Routes>
    </Router>
  )
}

export default App
