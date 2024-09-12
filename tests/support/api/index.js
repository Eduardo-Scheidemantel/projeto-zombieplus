const { expect } = require('@playwright/test')

export class Api {

    constructor(request) {
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        })

        expect(response.ok()).toBeTruthy()
        const body = JSON.parse(await response.text())
        this.token = body.token

        console.log(this.token)
    }
}