import { Banco, Correntista } from "@prisma/client"
import {
    cadastrarNovoCorrentistaBanco,
    obterCorrentistaPorId
} from "./crud/correntista/funcoes";
import {
    cadastrarBanco,
    excluirBanco,
    obterBancoPorId
} from "./crud/banco/funcoes";
import { vincularCorrentistaBanco } from "./crud/vinculo/funcoes";

const bb: Banco = {
    id: 0,
    nome: "Banco do Brasil",
    cnpj: "00000000000"
}

const itau: Banco = {
    id: 0,
    nome: "Itau",
    cnpj: "11111111111"
}

const caixa: Banco = {
    id: 0,
    nome: "Caixa",
    cnpj: "22222222222"
}

const correntista: Correntista = {
    id: 0,
    nome: "Daniel Pascal",
    cpf: "88888888888"
}

setTimeout(async () => { cadastrarBanco(bb) }, 500);
setTimeout(async () => { cadastrarBanco(itau) }, 500);
setTimeout(async () => { cadastrarBanco(caixa) }, 500);

setTimeout(async () => { obterBancoPorId(1) }, 1500);

setTimeout(async () => { cadastrarNovoCorrentistaBanco(correntista, 1) }, 3000);
setTimeout(async () => { vincularCorrentistaBanco(1, 2) }, 5000);

setTimeout(async () => { obterBancoPorId(1) }, 5000);
setTimeout(async () => { obterCorrentistaPorId(1) }, 7000);

setTimeout(async () => { excluirBanco(1) }, 10000);