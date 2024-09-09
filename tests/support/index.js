const { test: base, expect } = require('@playwright/test')

const { LandingPage } = require("../pages/LandingPage")
const { AdminPage } = require('../pages/AdminPage')
const { Toast } = require('../pages/Components')
const { MoviesPage } = require('../pages/MoviesPage')

const test = base.extend({
    page: async ({page}, use) =>{
        await use({
            ...page,
            landing: new LandingPage(page),
            login: new AdminPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page)
        })
    }
})

export { test, expect }