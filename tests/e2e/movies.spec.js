const { test, expect } = require("../support")

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

test('deve ser possível cadastrar um novo filme', async ({ page }) => {

    const movie = data.create
    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.toast.containText("Cadastro realizado com sucesso")
})

test('não deve cadastrar quando o título é duplicado', async ({ page, request }) => {

    await request.api.setToken()

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.toast.containText("Este conteúdo já encontra-se cadastrado no catálogo")
})

test('não deve cadastrar sem campos obrigatórios preenchidos', async ({ page }) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})