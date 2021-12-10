// Classe Produto
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


// Recebe os valores de input do produto na tabela
function confirmar(){
    
    let input_nome = document.querySelector('input#produto')
    let input_preco = document.getElementById('preco')
    let input_quant = document.getElementById('quantidade')
    
    let nome = input_nome.value 
    let preco = input_preco.value
    let quant =  input_quant.value

    item = new Produto(nome, preco, quant) // Instancia novo objeto da classe Produto
    
    addTabela(item)// Chamada da função com um objeto da classe Produto como parâmetro
    // Adiciona novo produto a tabela
    
    // Limpeza dos campos e foco no nome
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

    
    
    tbody.appendChild(tr) // Adicionando a linha ao corpo da tabela
    tbody.style.backgroundColor = 'red'

    atualizaTabela()  // Atualiza os totais no caso de mudança de quantidade

    atualizaTotalFinal() // Atualiza o total final ao confirmar novo produto
    
} // end addTabela(item)

// Ao mudar os valores de quantidade os totais são atualizados
function atualizaTabela(){
    let classeQuantItens = document.querySelectorAll('.quantItens') // Retorna um NodeList
    let td_Total_final = document.querySelector('td#Total_final')
    
    // Percorre o NodeList e executa a função com cada elemento
    classeQuantItens.forEach(  // Adiciona um EventListener para cada input na coluna quant
        
        function(atual){
            
            atual.addEventListener('change', () => { // Ao mudar o valor da coluna Quant, será atualizado o total
                //alert('Mudou')
                /*
                Usar forEach na classe totais para recalcular 
                */
                let classeTotalItens = document.querySelectorAll('.totalItens') // Retorna um NodeList
                let classePrecoItens = document.querySelectorAll('.precoItens') // Retorna um NodeList
                let total_final = 0 // será o acumulador da soma do total final
                // Atualiza o total da linha
                classeTotalItens.forEach(
                    function(atual, indice){
                        
                        atual.innerText = Number(classePrecoItens[indice].innerText) * classeQuantItens[indice].value // Preco * quantidade a cada mudança de valor
                        total_final += Number(atual.innerText) // soma acumulada 
                        td_Total_final.innerText = total_final // Atribuindo a soma acumulada
                    }) // end forEach da classeTotalItens
                    
                    
            })// end addEventListener
        } // end function do ForEach da classeQuantItens
    ) // end forEach

} // end atualizarTabela()

function atualizaTotalFinal (){ //atualiza o Total final ao confirmar um novo produto
    let td_Total_final = document.querySelector('td#Total_final')
    td_Total_final.style.backgroundColor = 'blue'
    let classeTotalItens = document.querySelectorAll('.totalItens')
    let total_final = 0
    classeTotalItens.forEach((atual) =>{
        total_final += Number(atual.innerText) 
    })
    td_Total_final.innerText = total_final
} // end atualizaTotalFinal


/*
    -Receber os inputs(check)
    -Validar os inputs
    -Jogar os valores na tabela (check)
    -Poder mudar a quantidade (check)
        - Ao mudar quantidade atualizar os totais
            - Da linha (check)
            - Total final (check)
    -Botão remover item
    -

*/


