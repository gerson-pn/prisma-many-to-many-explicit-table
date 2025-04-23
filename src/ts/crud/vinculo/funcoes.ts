import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const vincularCorrentistaBanco = async (correntistaId: number, bancoId: number) => {

    let resultado = await prisma.vinculo.create({
        data: {
            situacao: "ATIVO",
            bancoId: bancoId,
            correntistaId: correntistaId
        },
        include: {
            banco: true,
            correntista: true
        }
    })

    console.log(`--------------------------------------`)
    console.log(`Vinculos cadastrado:`)
    console.log(`Correntista:`)
    console.log(`Nome: ${resultado.correntista.nome}, CPF: ${resultado.correntista.cpf}`)
    console.log(`Banco cadastrado:`)
    console.log(`Nome: ${resultado.banco.nome}, CNPJ: ${resultado.banco.cnpj}`)
    console.log(`--------------------------------------\n`)
}

export {
    vincularCorrentistaBanco
}