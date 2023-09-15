import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';

function App() {

  return (
    <Router>
    {/* Je peux passer des props à mes composants */}
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
