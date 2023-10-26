const axios = require('axios');
const URL = 'https://rickandmortyapi.com/api/character/';

const getCharById = (req, res) => {
    const { id } = req.params;
    axios(URL + id)
    .then(({ data }) => {
        const { name, gender, species, origin, image, status } = data;
        const character = { id, name, gender, species, origin, image, status };
        return character.name
        ? res.json(character)
        : res.status(404).send("Character not found");
    })
    .catch((err) => {
        return res.status(500).send(err.message);
    })
};

module.exports = getCharById;
        
//version legible sin sin sintaxis abreviada:       
//const axios = require('axios');
//const URL = 'https://rickandmortyapi.com/api/character/';

//function getCharById(req, res) {
  //const id = req.params.id; // Obtener el ID del parámetro

 // axios.get(URL + id)
  //  .then((response) => {
  //    const characterData = response.data;

      // Extraer las propiedades relevantes del objeto de respuesta
    //  const id = characterData.id;
   //   const name = characterData.name;
   //   const gender = characterData.gender;
  //    const species = characterData.species;
   //   const origin = characterData.origin;
    //  const image = characterData.image;
   //   const status = characterData.status;

   //   const character = {
   //     id,
    //    name,
    //    gender,
    //    species,
    //    origin,
    //    image,
   //     status,
     // };

      // Verificar si el nombre del personaje está presente en los datos
    // if (character.name) {
     //   res.json(character); // Enviar la respuesta con los datos del personaje
    //  } else {
     //  res.status(404).send("Character not found"); // Personaje no encontrado
     // }
   // })
   // .catch((error) => {
      //res.status(500).send(error.message); // Error en la solicitud
  //  });
//}

//module.exports = getCharById;





//antes de express
//const axios = require("axios");

//const getCharById = (res, id) => {
    //axios(`https://rickandmortyapi.com/api/character/` + id)
   // .then(({ data }) => {
    //    const { name, gender, species, origin, image, status } = data;
     //   const character = { id, name, gender, species, origin, image, status };
     //   res.writeHead(200, { "Content-type": "application/json" });
     //   return res.end(JSON.stringify(character));
    //})
  //  .catch((err) => {
  //      res.writeHead(500, { "Content-type": "text/plain" });
  //      return res.end(err.message);
 //   });
//};

//module.exports = getCharById;