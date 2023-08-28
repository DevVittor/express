//Spread

const user={
    nome:"Vittor",
    altura:1.95,
    sexo: "Masculino"
}
const empresa = {
    nome:"Fonserra",
    local:"Barra da Tijuca",
    categoria:"Tecnologia",
    funcionario:{
        ...user
    }
}
console.log(empresa);