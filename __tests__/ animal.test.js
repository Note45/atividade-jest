const request = require('supertest');
const app = require('../src/app');
const fs = require('fs');
const animalsData = require('../src/data/animals.json');

describe('Animal Registration', () => {
  afterAll(() => {
    while(animalsData.length > 0) {
      animalsData.pop();
    }
    fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
  })

  it('should be able to register an animal', async () => {
    const response = await request(app).post('/animais?nome=Spike&especie=Cachorro&idade=3');
    expect(response.status).toBe(201);
  })

  it('should not be able to register an animal with wrong invalid idade field', async () => {
    const response = await request(app).post('/animais?nome=Mimi&especie=Gato&idade=jovem');
    expect(response.status).toBe(400);
  })

  it('should not be able to register an animal with invalid name length', async () => {
    const response = await request(app).post('/animais?nome=J&especie=Hamster&idade=1');
    expect(response.status).toBe(400);
  })
})

describe('Animal Listing', () => {
  beforeAll(() => {
    animalsData.push({
      id: 'idtest1',
      especie: 'Gato',
      nome: 'Nome Teste1',
      idade: "1"
    });
    animalsData.push({
      id: 'idtest2',
      especie: 'Cachoro',
      nome: 'Nome Teste2',
      idade: "2"
    });
    animalsData.push({
      id: 'idtest3',
      especie: 'Gato',
      nome: 'Nome Teste3',
      idade: "3"
    });

    fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
  })

  afterAll(() => {
    while(animalsData.length > 0) {
      animalsData.pop();
    }
    fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
  })

  it('should be able to list three animals', async () => {
    const response = await request(app).get('/animais');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  })
})