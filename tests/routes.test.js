const request = require('supertest')
const {server} = require('../index')

let idPerson

//first script
describe('Success requests', () => {
    it('should get all persons', async () => {
        const res = await request(server)
            .get('/person')
        expect(res.statusCode).toEqual(200)
    });

    it('should create person', async () => {
        const res = await request(server)
            .post('/person')
            .send({
                name: 'Anton',
                age: 18,
                hobbies: ['game','sport']
            })
        idPerson = JSON.parse(res.text).id
        expect(res.statusCode).toEqual(201)
        expect(JSON.parse(res.text).name).toBe('Anton')
    });

    it('should get person', async () => {
        const res = await request(server)
            .get(`/person/${idPerson}`)
        expect(res.statusCode).toEqual(200)
        expect(JSON.parse(res.text)[0].name).toBe('Anton')
        expect(JSON.parse(res.text)[0].id).toBe(idPerson)
    });

    it('should update person', async () => {
        const res = await request(server)
            .put(`/person/${idPerson}`)
            .send({
                name: 'Ivan'
            })
        expect(res.statusCode).toEqual(200)
        expect(JSON.parse(res.text).name).toBe('Ivan')
    });

    it('should delete person', async () => {
        const res = await request(server)
            .delete(`/person/${idPerson}`)
            .send({
                name: 'Ivan'
            })
        expect(res.statusCode).toEqual(204)
    });

    it('should get person', async () => {
        const res = await request(server)
            .get(`/person/${idPerson}`)
        expect(res.statusCode).toEqual(404)
        expect(res.text).toBe(`user this ${idPerson} id not found`)
    });
});

//second script
describe('Bad requests', () => {
    it('should returned mistake - specify required fields', async () => {
        const res = await request(server)
            .post('/person')
            .send({
                name: 'Anton',
                age: 18
            })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toBe('Specify required fields')
    });

    it('should returned mistake - user id not found', async () => {
        const idPerson = 'df883c50-4e15-11ec-a579-abb7f72f9b12'
        const res = await request(server)
            .get(`/person/${idPerson}`)
        expect(res.statusCode).toEqual(404)
        expect(res.text).toBe('user this df883c50-4e15-11ec-a579-abb7f72f9b12 id not found')
    });

    it('should returned mistake - user id not valid', async () => {
        const idPerson = 'df883c50-4e15-11ec-a579-abb7f72f.9b12'
        const res = await request(server)
            .get(`/person/${idPerson}`)
        expect(res.statusCode).toEqual(400)
        expect(res.text).toBe('user id not valid')
    });

    it('should returned mistake - id not found', async () => {
        const idPerson = 'df883c50-4e15-11ec-a579-abb7f72f8b12'
        const res = await request(server)
            .put(`/person/${idPerson}`)
            .send({
                name: 'Ivan'
            })
        expect(res.statusCode).toEqual(404)
        expect(res.text).toBe('user this df883c50-4e15-11ec-a579-abb7f72f8b12 id not found')
    });

    it('should returned mistake - user id not valid', async () => {
        const idPerson = 'df883c50-4e15-11ec-a579-abb7f72f8.b12'
        const res = await request(server)
            .put(`/person/${idPerson}`)
            .send({
                name: 'Ivan'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toBe('user id not valid')
    });

    it('should returned mistake - id not found', async () => {
        const idPerson = 'df883c50-4e15-11ec-a579-abb7f72f8b12'
        const res = await request(server)
            .delete(`/person/${idPerson}`)
            .send({
                name: 'Ivan'
            })
        expect(res.statusCode).toEqual(404)
    });
})

//third script
describe('bad url', () => {
    it('should returned mistake - PAGE NOT FOUND, WRITE CORRECT URL', async () => {
        const res = await request(server)
            .get('/personn')
        expect(res.statusCode).toEqual(404)
        expect(res.text).toBe('PAGE NOT FOUND, WRITE CORRECT URL')
    });
})