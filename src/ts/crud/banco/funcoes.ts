import { Banco, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const cadastrarBanco = async (banco: Banco) => {

    let resultado = await prisma.banco.create({
        data: {
            nome: banco.nome,
            cnpj: banco.cnpj
        }
    })

    console.log(`--------------------------------------`)
    console.log(`Banco cadastrado:`)
    console.log(`Nome: ${resultado.nome}, CNPJ: ${resultado.cnpj}`)
    console.log(`--------------------------------------\n`)
}

const obterBancoPorId = async (bancoId: number) => {
    let resultado = await prisma.banco.findUnique({
        where: {
            id: bancoId
        },
        include: {
            vinculos: {
                include: {
                    correntista: true
                }
            }
        }
    })

    if (resultado) {
        console.log(`--------------------------------------`)
        console.log(`Banco obtido:`)
        console.log(`Nome: ${resultado.nome}, CPNJ: ${resultado.cnpj}`)
        if (resultado.vinculos.length > 0) {
            console.log(`Vinculos obtidos:`)
            resultado.vinculos.forEach(vinculo => {
                console.log(`Nome correntista: ${vinculo.correntista.nome}, CPF: ${vinculo.correntista.cpf}`)
            })
        }
        console.log(`--------------------------------------\n`)
    } else {
        console.log(`--------------------------------------`)
        console.log(`banco não encontrado`)
        console.log(`--------------------------------------\n`)
    }
}


/*const excluirBanco = async (bancoId: number) => {

    let resultado = await prisma.banco.delete({
        where: {
            id: bancoId
        },
        include: {
            vinculos: {
                include: {
                    correntista: true
                }
            }
        }
    })

    console.log(`--------------------------------------`)
    console.log(`Banco excluído:`)
    console.log(`Nome: ${resultado.nome}, CNPJ: ${resultado.cnpj}`)
    if (resultado.vinculos.length > 0) {
        console.log(`Correntistas que estavam vinculados:`)
        resultado.vinculos.forEach(vinculo => {
            console.log(`Nome: ${vinculo.correntista.nome}, CPF: ${vinculo.correntista.cpf}`)
        })
    }
    console.log(`--------------------------------------\n`)
}*/

const excluirBanco = async (bancoId: number) => {

    let resultadoVinculo = await prisma.vinculo.deleteMany({
        where: {
            bancoId: bancoId
        }
    })

    let resultadoBanco = await prisma.banco.delete({
        where: {
            id: bancoId
        },
        include: {
            vinculos: {
                include: {
                    correntista: true
                }
            }
        }
    })

    console.log(`--------------------------------------`)
    console.log(`Banco excluído:`)
    console.log(`Nome: ${resultadoBanco.nome}, CNPJ: ${resultadoBanco.cnpj}`)
    if (resultadoBanco.vinculos.length > 0) {
        console.log(`Correntistas que estavam vinculados:`)
        resultadoBanco.vinculos.forEach(vinculo => {
            console.log(`Nome: ${vinculo.correntista.nome}, CPF: ${vinculo.correntista.cpf}`)
        })
    }
    console.log(`--------------------------------------\n`)
}

export {
    cadastrarBanco,
    obterBancoPorId,
    excluirBanco
}