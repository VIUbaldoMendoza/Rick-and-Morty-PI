import { useEffect, useState } from 'react';
import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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

   //const email = 'viri@gmail.com'
   //const password = '12345'

   function login(userData) {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/login/';
      axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
         const { access } = data;
         setAccess(data);
         access && navigate('/home');
      });
   }

   //const login = (userData) => {
   //   if (userData.email === email && userData.password === password) {
   //      setAcces(true)
   //      navigate('/home')
   //   } else {
   //      alert("usuario o contraseña incorrectos")
   //   }
   
   //

   const onSearch = (id) => {
      axios
      .get(`http://localhost:3001/rickandmorty/character/${id}`)
      //(`https://rickandmortyapi.com/api/character/${id}`)
      .then(({ data }) => {
         if (data.name) {
            const isDuplicate = characters.some((char) => char.id === data.id);
            if (isDuplicate) {
               window.alert('Este personaje ya está en la lista.');
            } else {
               setCharacters((oldChars) => [...oldChars, data]);
            }
         }
      })
      .catch((error) => {
         if (error.response && error.response.status === 404) {
            window.alert('¡No hay personajes con este ID!');
         } else {
            console.error('Error al buscar personaje:', error);
         }
      });
   };
   
   const addRandomCharacter = () => {
      const randomId = Math.floor(Math.random() * 826) + 1;
      onSearch(randomId);
   };
   
   const onClose = (id) => {
      setCharacters(
         characters.filter((char) => {
            return char.id !== Number(id);
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