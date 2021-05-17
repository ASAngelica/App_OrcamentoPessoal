
// Classe para instanciar um obj a partir dos dados do formulario
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    // O retorno deste método valida os dados através da função cadastrarDespesa() que grava os dados (web storage)
    // atraves do método gravar da classe Bd.
    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

// Classe para instanciar o(s) objeto(s) da API de armazenamento na web (Web Storage) que fornece mecanismos 
// para que os navegadores possam armazenar dados através de chave/valor de uma forma mais eficiente 
// que os cookies.

class Bd {

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id') //null
        return parseInt(proximoId) + 1
    }

    gravar(d){
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){
        let despesas = Array()
        let id = localStorage.getItem(`id`)

        //recuperar todas as despesas cadastradas em localStorage
        for(let i=1; i<=id; i++){
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa === null) {
                continue
            }
            despesas.push(despesa)
        }
        return despesas
    }

    pesquisar(despesa){
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        
        console.log(despesa)

        console.log(despesasFiltradas)

        //ano
        if(despesa.ano != ''){
            console.log('filtro de ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        //mes

        if(despesa.mes != ''){
            console.log('filtro de mês')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //dia

        if(despesa.dia != ''){
            console.log('filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //tipo

        if(despesa.tipo != ''){
            console.log('filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        //descricao

        if(despesa.descricao != ''){
            console.log('filtro de descrição')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //valor

        if(despesa.valor != ''){
            console.log('filtro de valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        console.log(despesasFiltradas)
    }
}

let bd = new Bd()

// instancia um objeto despesa da classe Despesa a partir dos dados do formulario e através do método
// 'gravar' da classe 'Bd' utiliza a API de armazenamento na web (Web Storage) para criar persistencia de 
// dados já que a aplicação não terá conexão com Banco de Dados algum.
function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )
    // Grava os dados (WebStorage) a partir do metodo validarDados() da classe Despesa e exibe um alerta Baseado 
    // em um componente Modal do bootstrap, e o recurso Modal da biblioteca jquery.
    if(despesa.validarDados()){
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso!'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso!'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'

        $('#modalRegistraDespesa').modal('show') //jquery

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {

        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro!'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'O preenchimento de todos os campos é Obrigatório.'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        $('#modalRegistraDespesa').modal('show') //jquery
    }
}

function carregaListaDespesas(){
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()

    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    // </tr>
    //     <td>15/03/2018</td>
    //     <td>Alimentação</td>
    //     <td>Compras do Mẽs</td>
    //     <td>444.75</td>
    // </tr>

    //percorrer o array despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d){
        console.log(d)

        //criando a linha (tr)
        // id do elemento <tbody></tbody> listaDespesas com o metodo .insertRow() acrescenta as linhas a view tabela.
        let linha = listaDespesas.insertRow()

        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //ajustar o tipo
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value 
    let dia = document.getElementById('dia').value 
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    bd.pesquisar(despesa)
}


