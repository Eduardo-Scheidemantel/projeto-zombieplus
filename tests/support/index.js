const { test: base, expect } = require('@playwright/test')

const { LandingPage } = require("../pages/LandingPage")
const { AdminPage } = require('../pages/AdminPage')
const { Toast } = require('../pages/Components')
const { MoviesPage } = require('../pages/MoviesPage')

const test = base.extend({
    page: async ({ page }, use) => {

        const context = page

        context['landing'] = new LandingPage(page)
        context['login'] = new AdminPage(page)
        context['movies'] = new MoviesPage(page)
        context['toast'] = new Toast(page)

        await use(page)
    }
})

export { test, expect }