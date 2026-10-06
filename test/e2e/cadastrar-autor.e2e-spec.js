import { describe, test, after } from "node:test";
import request from 'supertest';
import app from '#src/app.js'
import conexao from "#db/singleton-connection.js";
import assert from "node:assert";

describe("Cadastrar Autor", async () => {

    after(async () => {
        await conexao.destroy();
    })

    test("Retorna os dados do autor cadastrado quando os dados são válidos (201).", async () => {
        await request(app).post('/autores').send({
            "nome": "H.P. Lovecraft",
            "nacionalidade": "Ingles"
        }).expect(201)
        .expect( (response) => {
            const dadosResposta = response.body.content;
            assert.strictEqual(dadosResposta.nome, "H.P. Lovecraft")
            assert.strictEqual(dadosResposta.nacionalidade, "Ingles")

        })
    })
})