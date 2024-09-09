import { expect } from "@playwright/test";
import { Toast } from "./Components";

export class MoviesPage {

    constructor(page) {
        this.page = page
    }

    async isLoggedIn(username) {

        const loggedUser = this.page.locator('.logged-user')
        await expect(loggedUser).toHaveText(`Olá, ${username}`)
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async create(title, overview, company, release_year) {

        await this.goForm()

        await this.page.locator('#title').fill(title)
        await this.page.locator('#overview').fill(overview)

        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: company })
            .click()

        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: release_year })
            .click()

        await this.submit()
    }

    async alertHaveText(target) {
        await expect(this.page.locator(".alert")).toHaveText(target);
    }

}