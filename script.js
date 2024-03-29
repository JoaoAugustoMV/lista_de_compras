// Classe Produto
function Produto(nome, preco, quant){ 
    this.nome = nome,
    this.preco = preco,
    this.quant = quant
    this.total = preco * quant
    this.remover = 0 // Apenas para facilitar a adição do botao remover 
        
}
/*class Produto{
    constructor(nome, preco, quant){
        this.nome = nome,
        this.preco = preco,
        this.quant = quant

    }
}*/


// Recebe os valores de input do produto na tabela
let listaItens = []

function atualizaLista(){ // 
    // TO DO utilizar a listaItens(composta por Produto)
    let linhas = document.querySelectorAll("tbody")[0].rows
    
    listaItens.forEach((produto) => {
        console.log(produto)
    })
}
function confirmar(){
    
    let input_nome = document.querySelector('input#produto')
    let input_preco = document.getElementById('preco')
    let input_quant = document.getElementById('quantidade')
    
    let nome = input_nome.value 
    let preco = input_preco.value
    let quant =  input_quant.value

    item = new Produto(nome, preco, quant) // Instancia novo objeto da classe Produto
    listaItens.push(item)
    // tr#nomeItens
    
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
    for (i in item){  // Iterando o item a ser adicionado
    
        let td = document.createElement('td') // Criando um novo td (lugar na linha)
        
        //alert('item[i]  =  ' + item[i] + '  i =  ' + i)
        
        if(i == 'quant' || i == 'preco'){ // Se for quantidade adiciona um input da classe quantidadeItens
            //alert('i == quant')
            let input_n = document.createElement('input')
            input_n.type = 'number'
            input_n.value = item[i]
            input_n.className = `${i}Itens inputsVariaveis`
            td.appendChild(input_n)
        // end if(i == 'quant')    
        
        } else if( i == 'remover'){ // Para adicionar o botão remover
            let btn_remover = document.createElement('button') // Cria um botão
            //btn_remover.innerText = 'remover' // Escreve no botão
            btn_remover.className = `btn_${i}Itens` // Adiciona a classe btn_removerItens
            btn_remover.onclick = () => { /* Ao clicar no botão remover:
                    - Tem um pergunta de confirmação
                    - Se a resposta for sim, remove o item e atualiza a tabela inteira
                    - Se não, nada acontece
                 */
                // confirm(): retorna true ou false
                let resp = confirm(`Tem certeza que deseja remover ${tr.id} da lista? `) // Pergunta de confirmação
                
                if (resp){ // Se sim
                    tr.remove()
                    atualizaTabela()
                    atualizaTotalFinal()
                }
            }
            td.appendChild(btn_remover) // Adiciona o botão
            td.title = 'Remover Item'
            
        }
         else {// Se for diferente de quant e de remover, o td(valor da linha) será o atributo e a classe respectiva do item
            //alert('else')
            td.innerText = item[i] // Atribuindo o atributo do objeto item na posição da linha
            td.className = `${i}Itens`
        } // end else

        
        tr.appendChild(td) // Adicionando a posição a linha
        tr.id = item.nome // id da linha será o nome do produto
    } // end for(i in item)

    
    
    tbody.appendChild(tr) // Adicionando a linha ao corpo da tabela
    

    atualizaTabela()  // Atualiza os totais no caso de mudança de quantidade

    atualizaTotalFinal() // Atualiza o total final ao confirmar novo produto
    
} // end addTabela(item)

// Ao mudar os valores de quantidade os totais são atualizados
function atualizaTabela(){
    
    let classeInputsVariaveis = document.querySelectorAll('.inputsVariaveis')
    let td_Total_final = document.querySelector('td#Total_final')
    
    // Percorre o NodeList e executa a função com cada elemento
    // console.log(classeInputsVariaveis)
    classeInputsVariaveis.forEach(  // Adiciona um EventListener para cada input na coluna quant
        
        function(atual){
            
            atual.addEventListener('change', () => { // Ao mudar o valor da coluna Quant, será atualizado o total
                //alert('Mudou')
                /*
                Usar forEach na classe totais para recalcular 
                */
               let classeTotalItens = document.querySelectorAll('.totalItens') // Retorna um NodeList
               let classeQuantItens = document.querySelectorAll('.quantItens') // Retorna um NodeList
               let classePrecoItens = document.querySelectorAll('.precoItens') // Retorna um NodeList
               let total_final = 0 // será o acumulador da soma do total final
               // Atualiza o total da linha
            //    console.log(listaItens)
               atualizaLista()

               classeTotalItens.forEach(
                   function(atual, indice){
                        
                        atual.innerText = (classePrecoItens[indice].value) * classeQuantItens[indice].value // Preco * quantidade a cada mudança de valor
                        total_final += Number(atual.innerText) // soma acumulada 
                        td_Total_final.innerText = total_final // Atribuindo a soma acumulada
                    }) // end forEach da classeTotalItens
                    
                    
            })// end addEventListener
        } // end function do ForEach da classeQuantItens
    ) // end forEach

} // end atualizarTabela()

function atualizaTotalFinal (){ //atualiza o Total final ao confirmar um novo produto
    let td_Total_final = document.querySelector('td#Total_final')
    let classeTotalItens = document.querySelectorAll('.totalItens')
    let total_final = 0
    classeTotalItens.forEach((atual) =>{
        total_final += Number(atual.innerText) 
    })
    td_Total_final.innerText = total_final
} // end atualizaTotalFinal

function remover_todos(){
    linhas = document.querySelectorAll('tbody > tr')
    resp = confirm('Tem certeza que quer remover todos os produtos')
    if (resp){
            for (l in linhas){
            linhas[l].remove()

            atualizaTotalFinal()
        } // end for(l in  linhas)
    } // end if(resp)
}// end remover_todos()

let inputs_iniciais = document.getElementsByTagName('input')
// [0] Nome, [1] preço, [2] quantidade
let btn_confirmar = document.getElementsByTagName('button')[0]
// [0] confirmar


// TODO: Confirmar ao apertar Enter
// Ao apertar enter mudar o foco nos inputs do começo 
// let f = 0  // focus
// for (i =0 ;i < 3; i++){ // Varre os inputs do começo
    
//     inputs_iniciais[i].addEventListener('keypress', function(enter){ // Monitorar as teclas 
        
//         if(enter.key === 'Enter'){ // Se a tecla Enter for pressionada
            
//             f++ // Ir para o proximo campo

//             if (f == 3){ // Se 3, significa que os 3 inputs do começo foram preenchidos
                
//                 f = 0 // focus para o primeiro input
//                 btn_confirmar.click() // confirmar
//             } // if(f == 3)
            
//             inputs_iniciais[f].focus() // focus no o
            
//         } // end if(enter.key === 'Enter') 
        
//     }) // end addEventListener()

// } // end for (i = 0 ;i < 3; i++)


/*
    -Receber os inputs(check)
    -Enter para trocar de campos (check)
    -Validar os inputs
    -Jogar os valores na tabela (check)
    -Poder mudar a quantidade (check)
        - Ao mudar quantidade atualizar os totais
            - Da linha (check)
            - Total final (check)
    -Botão remover item (check)
    -Botão remover todos itens

    - Modelo de compra
    { 
        produto: string,
        valor: number,
        quant: number,
        totalProduto,
    }

    
*/


