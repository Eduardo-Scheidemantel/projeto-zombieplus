const { test, expect } = require("../support")

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    await executeSQL(`DELETE from movies`)
})

test('deve ser possível cadastrar um novo filme', async ({ page }) => {
    const movie = data.create

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.popup.haveText(
        `O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test('deve poder remover um filme', async ({ page, request }) => {
    const movie = data.to_remove
    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    // x-path: //td[text()="A Noite dos Mortos-Vivos"]/..//button

    await page.getByRole('row', { name: movie.title })
        .getByRole('button').click()

    await page.click('.confirm-removal')
    await page.popup.haveText(
        'Filme removido com sucesso.')
})

test('não deve cadastrar quando o título é duplicado', async ({ page, request }) => {
    const movie = data.duplicate

    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)

    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.popup.haveText(
        `O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})

test('não deve cadastrar sem campos obrigatórios preenchidos', async ({ page }) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})