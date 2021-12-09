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


function addTabela(item){ // Adiciona os itens na tabela
    let tbody = document.querySelector('tbody#itens') // Recebendo a tag do corpo da tabela
    let tr = document.createElement('tr') // Criando uma nova Linha
    for (i in item){  // Varrendo o objeto
    
        let td = document.createElement('td') // Criando um novo td (lugar na linha)
        
        //alert('item[i]  =  ' + item[i] + '  i =  ' + i)
        
        if(i == 'quant'){ // Se for quantidade adiciona um input da classe quantidadeItens
            //alert('i == quant')
            let input_n = document.createElement('input')
            input_n.type = 'number'
            input_n.value = item[i]
            input_n.className = `${i}Itens`
            td.appendChild(input_n)
        // end if(i == 'quant')    

        } else {// Se for diferente de quant o td(valor da linha) será o atributo e a classe respectiva do item
            //alert('else')
            td.innerText = item[i] // Atribuindo o atributo do objeto item na posição da linha
            td.className = `${i}Itens`
        } // end else

        
        tr.appendChild(td) // Adicionando a posição a linha
        tr.id = item.nome // id da linha será o nome do produto
    } // end for(i in item)

    let td_Total_final = document.querySelector('td#Total_final')
    td_Total_final.style.backgroundColor = 'blue'
    
    
    /*JavaScript não tem função ou metodo para somar um array
        Então é preciso recorrer ao reducer, no caso:
            - Imagine um for e cada iteração o retorno da função é atribuido ao acumulador
    */ 
    const reducer = (acumulador, atual) =>  acumulador + atual
    td_Total_final.innerText = totais.reduce(reducer) // Atribuindo a soma do array na tabela
    
    tbody.appendChild(tr) // Adicionando a linha ao corpo da tabela
    tbody.style.backgroundColor = 'red'

/*
    -Receber os inputs(check)
    -Validar os inputs
    -Jogar os valores na tabela (check)
    -Botão remover item
    -Poder mudar a quantidade (check)
        - Ao mudar quantidade atualizar os totais
            - Da linha
            - Total final
    -

*/



