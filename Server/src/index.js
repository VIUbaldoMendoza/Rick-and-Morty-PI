const http = require("http"); //importar el modulo http
const PORT = 3001;
const characters = require("./utils/data");
//const url = require('url');
//const data = require('./utils/data');

http
    .createServer((req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        
        const { url } = req;
        
        if(url.includes("/rickandmorty/character")) {
            const id = Number(url.split('/').pop());
            const character = characters.find((char) => {
                return char.id === id;
            });
            
            res.writeHead(200, { "Content-Type": "aplication/json" });
            res.end(JSON.stringify(character));
        }
    })
    .listen(PORT, "localhost");

//const server = http.createServer((req, res) => { //crear el servidor
    //res.setHeader('Access-Control-Allow-Origin', '*'); //establece la politica en la respuesta que se enviara al cliente

    //const parsedUrl = url.parse(req.url, true);
    //const pathSegments = parsedUrl.pathname.split('/');
    //const id = pathSegments[pathSegments.length - 1];

    //if (pathSegments.includes('rickandmorty') && pathSegments.includes('character')) {
        //const character = data.find(character = character.id === parseInt(id, 10));

        //if (character) {
            //res.writeHead(200, { 'Content-Type': 'aplication/json' });
            //res.end(JSON.stringify(character));
        //} else {
            //res.writeHead(404, { 'Content-Type': 'text/plain' });
            //res.end('Personaje no encontrado');
        //}
    //} else {
        //res.writeHead(400, { 'Content-Type': 'text/plain' });
        //res.end('URL no válida');
    //}
//});

//const PORT = 3001;  //escucha el puerto 3001

//server.listen(PORT, () => {
    //console.log(`Servidor escuchando en el puerto ${PORT}`);
//});
