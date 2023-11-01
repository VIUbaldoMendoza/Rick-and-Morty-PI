const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

describe('Test de RUTAS', () => {
    describe('GET /rickandmorty/character/:id', () => {
        it('Responds with status: 200', async() => {
            await agent.get('/rickandmorty/character/1').expect(200);
        });

        it('Responds with an object containing the properties: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = (await agent.get('/rickandmorty/character/1')).body;
            expect(response).toHaveProperty('id');
            expect(response).toHaveProperty('name');
            expect(response).toHaveProperty('species');
            expect(response).toHaveProperty('gender');
            expect(response).toHaveProperty('status');
            expect(response).toHaveProperty('origin');
            expect(response).toHaveProperty('image');
        });

        it('If there is an error, responds with status: 500', async() => {
            await agent.get('/rickandmorty/character/1111111').expect(500);
        });
    });

    describe('GET /rickandmorty/login', () => {
        it('The login information is correct.', async() => {
            const response = (await agent.get(`/rickandmorty/login?email=viri@gmail.com&password=12345`)).body;
            expect(response.access).toEqual(true);
        });
        
        it('The login information is incorrect.', async() => {
            const response = (await agent.get(`/rickandmorty/login?email=virri.com&password=958458`)).body;
            expect(response.access).toEqual(false);
        });
    });

    describe('POST /rickandmorty/fav', () => {  //me quede aquí
        const character1 = { id: '1', name: 'Rick' };
        const character2 = { id: '2', name: 'Morty' };

        it('Returns a character in the first call', async() => {
            const response = (await agent.post('/rickandmorty/fav').send(character1));
            expect(response).toBeDefined(); 
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body).toContainEqual(character1);
        });
        
        it ('Returns two characters in the second call', async () => {
            const response = (await agent.post('/rickandmorty/fav').send(character2));
            expect(response).toBeDefined();
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body).toContainEqual(character1);
            expect(response.body).toContainEqual(character2);    
        });
    });

    describe('DELETE /rickandmorty/fav/:id', () => {
        const character1 = { id: '1', name: 'Rick' };
        const character2 = { id: '2', name: 'Morty' };

        it('Returns an array with the previous elements', async () => {
            const response = (await agent.delete('/rickandmorty/fav/3')).body;
            expect(response).toContainEqual(character1);
            expect(response).toContainEqual(character2);
        });

        it('Deletes a character by ID correctly', async () => {
            const response = (await agent.delete('/rickandmorty/fav/1')).body;
            expect(response).not.toContainEqual(character1);
            expect(response).toContainEqual(character2);
        });
    });

});