import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import PATHROUTES from './helpers/Pathroutes.helper';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';



function App() {
   
   const [characters, setCharacters] = useState([]);
   const {pathname} = useLocation()
   const navigate = useNavigate()

   const [access, setAccess] = useState(false);
   
   async function login(userData) {
      try {
         const { email, password } = userData
         const URL = 'http://localhost:3001/rickandmorty/login/'
         const { data } = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = data;
         setAccess(data);
         access && navigate('/home');
      } catch (error) {
         console.log(error);  //window.alert('¡No hay personaje con ese ID!');
      }

   }
   
   const onSearch = async(id) => {
      try {
         const {data} = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      } catch (error) {
         console.log(error)
      }
   }
   
   const addRandomCharacter = () => {
      const randomId = Math.floor(Math.random() * 826) + 1;
      onSearch(randomId);
   };
   
   const onClose = (id) => {
      setCharacters(
         characters.filter((char) => {
            return char.id !== id;
         })
      );
   };
   
   useEffect(() => {
      !access && navigate("/");
   }, [access]);
   
   return (
      <div className="App">
         {pathname !== '/' && <Nav onSearch={onSearch} agregarPersonajeRandom={addRandomCharacter} />}
         
         <Routes>
            <Route path = "/" element={<Form login={login}/>} />
            <Route path={PATHROUTES.HOME} element={<Cards characters={characters} onClose={onClose} />}/>
            <Route path={PATHROUTES.ABOUT} element={<About/>}/>
            <Route path={PATHROUTES.DETAIL} element={<Detail/>}/>
            <Route path={PATHROUTES.FAVORITES} element={<Favorites/>}/>
         </Routes>
      </div>
   );
}

export default App;