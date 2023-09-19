import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from 'react';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Game from './pages/Game';
import Favourites from './pages/Favourites';
import Collection from './pages/Collection';

function App() {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Je je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(Cookies.get("token") || null);

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

  return (
    <Router>
    {/* Je peux passer des props à mes composants */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/games/:id' element={<Game />} />
        <Route path='/login' element={<Login handleToken={handleToken} />} />
        <Route path='/signup' element={<Signup handleToken={handleToken} />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path='/collection' element={<Collection />} />
      </Routes>
    </Router>
  )
}

export default App
