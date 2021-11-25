const request = require('supertest')
const {server} = require('../index')

let idPerson

describe('Post Endpoints', () => {
    it('should get all persons', async () => {
        const res = await request(server)
            .get('/person')
        expect(res.statusCode).toEqual(200)
        expect(res.data).toBe(undefined)
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
        expect(res.statusCode).toEqual(200)
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
        expect(res.statusCode).toEqual(200)
        expect(res.text).toBe('user success delete')
    });

    it('should get person', async () => {
        const res = await request(server)
            .get(`/person/${idPerson}`)
        expect(res.statusCode).toEqual(404)
        expect(res.text).toBe(`user this ${idPerson} id not found`)
    });
})