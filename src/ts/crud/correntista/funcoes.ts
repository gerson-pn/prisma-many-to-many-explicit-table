import { Correntista, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const obterCorrentistaPorId = async (correntistaId: number) => {
    let resultado = await prisma.correntista.findUnique({
        where: {
            id: correntistaId
        },
        include: {
            vinculos: {
                include: {
                    banco: true
                }
            }
        }
    })

    if (resultado) {
        console.log(`--------------------------------------`)
        console.log(`Correntista obtido:`)
        console.log(`Nome: ${resultado.nome}, CPF: ${resultado.cpf}`)
        if (resultado.vinculos.length > 0) {
            console.log(`Vinculos obtidos:`)
            resultado.vinculos.forEach(vinculo => {
                console.log(`Nome banco: ${vinculo.banco.nome}, CNPJ: ${vinculo.banco.cnpj}`)
            })
        }
        console.log(`--------------------------------------\n`)
    } else {
        console.log(`--------------------------------------`)
        console.log(`Correntista não encontrado`)
        console.log(`--------------------------------------\n`)
    }
}

const cadastrarNovoCorrentistaBanco = async (correntista: Correntista, bancoId: number) => {

    let resultado = await prisma.correntista.create({
        data: {
            nome: correntista.nome,
            cpf: correntista.cpf,
            vinculos: {
                create: [
                    {
                        situacao: "ATIVO",
                        banco: {
                            connect: {
                                id: bancoId
                            }
                        }
                    }
                ]
            }
        },
        include: {
            vinculos: {
                include: {
                    banco: true
                }
            }
        }
    })

    console.log(`--------------------------------------`)
    console.log(`Correntista cadastrado:`)
    console.log(`Nome: ${resultado.nome}, CPF: ${resultado.cpf}`)
    if (resultado.vinculos.length > 0) {
        console.log(`Bancos vinculados:`)
        resultado.vinculos.forEach(vinculo => {
            console.log(`Nome: ${vinculo.banco.nome}, CNPJ: ${vinculo.banco.cnpj}`)
        })
    }
    console.log(`--------------------------------------\n`)
}

export {
    obterCorrentistaPorId,
    cadastrarNovoCorrentistaBanco
}