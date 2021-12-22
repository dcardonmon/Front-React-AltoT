import React from 'react';
import "./index.css"
import { Routes, Route } from 'react-router';
import Login from './Components/Login'
import Home from './Components/Home'
import NewAccount from './Components/NewAccount'
import Productos from './Components/Productos'
import Users from './Components/Users'
import Orders from './Components/Orders';
import Catalogo from './Components/Catalogo';


function App(){
  
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/NewAccount" element={<NewAccount />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Catalogo" element={<Catalogo/>} />
      </Routes>
    </div>

  )
}





export default App;