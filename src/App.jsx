import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User from './User'
import {BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom'
import Posts from './posts'

function App() {
  
  const [username, setUsername] = useState(localStorage.getItem('username'));

 
  return (
    <>
    <Router>
      <Routes>
       <Route path="/" element={<User />} />
      <Route path="/home" element={<Posts />} />
      <Route path="*" element={<h1>page not found</h1>} />
     
      </Routes>
     
     </Router>
    </>
  )
}

export default App
