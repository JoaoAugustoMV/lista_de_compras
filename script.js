function Produto(nome, preco, quant){
    this.nome = nome,
    this.preco = preco,
    this.quant = quant
    this.total = preco * quant
}
/*class Produto{
    constructor(nome, preco, quant){
        this.nome = nome,
        this.preco = preco,
        this.quant = quant

    }
}*/

function confirmar(){
    
    
    let input_nome = document.querySelector('input#produto')
    let input_preco = document.getElementById('preco')
    let input_quant = document.getElementById('quantidade')
    
    let nome = input_nome.value 
    let preco = input_preco.value
    let quant =  input_quant.value

    item = new Produto(nome, preco, quant) // Instancia novo objeto da classe Produto
    addTabela(item)
    alert(`Produto ${item.nome} preco${item.preco} quant ${item.quant}`)
    
    input_nome.value = ''
    input_preco.value = ''
    input_quant.value = ''
    input_nome.focus()
} // end confirmar()

let totais = []
function addTabela(item){ // Adiciona os itens na tabela
    let tbody = document.querySelector('tbody#itens') // Recebendo a tag do corpo da tabela
    let tr = document.createElement('tr') // Criando uma nova Linha
    for (i in item){  // Varrendo o objeto
        let td = document.createElement('td') // Criando um novo td (lugar na linha)
        td.innerText = item[i] // Atribuindo o atributo do objeto item na posição da linha
        tr.appendChild(td) // Adicionando a posição a linha
        alert('item' + item[i])
        if(i == 'total'){
            totais.push(item[i])
        }
    }

    let td_Total_final = document.querySelector('td#Total_final')
    td_Total_final.style.backgroundColor = 'blue'
    
    alert('totais = ' + totais)
    /*JavaScript não tem função ou metodo para somar um array
        Então é preciso recorrer ao reducer, no caso:
            - Imagine um for e cada iteração o retorno da função é atribuido ao acumulador
    */ 
    const reducer = (acumulador, atual) =>  acumulador + atual
    td_Total_final.innerText = totais.reduce(reducer) // Atribuindo a soma do array na tabela
    tbody.appendChild(tr) // Adicionando a linha ao corpo da tabela
    tbody.style.backgroundColor = 'red'
}

/*
    -Receber os inputs(check)
    -Validar os inputs
    -Jogar os valores na tabela (check)
    -
    -

*/
